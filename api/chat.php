<?php
// Lightweight PHP proxy for OpenAI Responses API with basic abuse controls.
declare(strict_types=1);

// Security headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
header('Permissions-Policy: microphone=()');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
header('Cache-Control: no-store, max-age=0');

$respond = static function (int $status, array $payload): void {
    http_response_code($status);
    echo json_encode($payload);
    exit;
};

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $respond(405, ['error' => 'Method not allowed']);
}

// Same-domain guard: block unexpected cross-origin calls.
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $originHost = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $host = $_SERVER['HTTP_HOST'] ?? null;
    if (!$originHost || !$host || strtolower($originHost) !== strtolower($host)) {
        $respond(403, ['error' => 'Cross-origin requests are not allowed']);
    }
}

$rawBody = file_get_contents('php://input') ?: '';
$data = json_decode($rawBody, true);
$message = is_array($data) && isset($data['message']) ? trim((string) $data['message']) : '';

if ($message === '' || mb_strlen($message) > 1000) {
    $respond(400, ['error' => 'Message must be between 1 and 1000 characters']);
}

// Simple per-IP rate limiting using private storage (outside web root).
$tmpDir = __DIR__ . '/../../openai-tmp';
if (!is_dir($tmpDir)) {
    mkdir($tmpDir, 0700, true);
}
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ipKey = preg_replace('/[^a-zA-Z0-9:_-]/', '_', $ip);
$limitFile = $tmpDir . '/' . $ipKey . '.json';
$limit = 10; // max requests
$window = 60; // in seconds
$now = time();
$record = ['count' => 0, 'reset' => $now + $window];

if (file_exists($limitFile)) {
    $stored = json_decode((string) file_get_contents($limitFile), true);
    if (is_array($stored) && isset($stored['count'], $stored['reset'])) {
        $record = $stored;
    }
}

if ($now > ($record['reset'] ?? 0)) {
    $record = ['count' => 0, 'reset' => $now + $window];
}

if ($record['count'] >= $limit) {
    $respond(429, ['error' => 'Rate limit exceeded. Please wait a moment.']);
}

$record['count']++;
file_put_contents($limitFile, json_encode($record), LOCK_EX);

require_once __DIR__ . '/../../openai-config.php';
if (!defined('OPENAI_API_KEY') || !OPENAI_API_KEY) {
    $respond(500, ['error' => 'Server configuration error']);
}

$payload = [
    'model' => 'gpt-4.1-mini',
    'input' => $message,
    'max_output_tokens' => 200,
    'temperature' => 0.5,
];

$ch = curl_init('https://api.openai.com/v1/responses');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . OPENAI_API_KEY,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 15,
    CURLOPT_CONNECTTIMEOUT => 5,
]);

$result = curl_exec($ch);
$curlError = curl_error($ch);
$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0;
curl_close($ch);

if ($result === false) {
    error_log('OpenAI upstream connection failed: ' . $curlError);
    $respond(502, ['error' => 'Upstream connection failed']);
}

$json = json_decode($result, true);
if ($status >= 400 || !$json) {
    error_log('OpenAI upstream error [' . $status . ']: ' . $result);
    $message = $json['error']['message'] ?? 'Upstream response error';
    $respond($status ?: 502, ['error' => $message]);
}

$reply = $json['output_text']
    ?? ($json['output'][0]['content'][0]['text'] ?? null)
    ?? ($json['choices'][0]['message']['content'] ?? null);

if (!$reply) {
    $respond(500, ['error' => 'No reply returned from model']);
}

$respond(200, ['reply' => trim((string) $reply)]);
