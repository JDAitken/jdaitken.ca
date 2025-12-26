<?php
header('Content-Type: application/json; charset=utf-8');

$configPath = dirname(__DIR__, 2) . '/private/psi-config.php'; // points to /private/
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['error' => 'Missing server config.']);
  exit;
}
$config = require $configPath;

$apiKey = $config['PAGESPEED_API_KEY'] ?? '';
if (!$apiKey) {
  http_response_code(500);
  echo json_encode(['error' => 'Missing API key.']);
  exit;
}

// --- Basic rate limit (per IP, per minute) ---
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/psi_rl_' . preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $ip) . '_' . gmdate('YmdHi');
$count = 0;
if (file_exists($bucket)) {
  $count = (int)file_get_contents($bucket);
}
$count++;
file_put_contents($bucket, (string)$count);
$limit = (int)($config['RATE_LIMIT_PER_MIN'] ?? 15);
if ($count > $limit) {
  http_response_code(429);
  echo json_encode(['error' => 'Rate limit exceeded. Try again in a minute.']);
  exit;
}

// --- Read query params ---
$url = $_GET['url'] ?? '';
$strategy = $_GET['strategy'] ?? 'mobile';
$strategy = strtolower($strategy) === 'desktop' ? 'desktop' : 'mobile';

// Validate URL
if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid url.']);
  exit;
}

// Optional: prevent weird internal targets (basic)
$parsed = parse_url($url);
$host = $parsed['host'] ?? '';
if (!$host) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid host.']);
  exit;
}

// Build PSI request
$endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
$params = http_build_query([
  'url' => $url,
  'key' => $apiKey,
  'strategy' => $strategy,
  // request only what we need:
  'category' => ['performance', 'seo'],
]);

$psiUrl = $endpoint . '?' . $params;

// Call PSI
$ch = curl_init($psiUrl);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 45,
  CURLOPT_CONNECTTIMEOUT => 10,
  CURLOPT_USERAGENT => 'jdaitken.ca PSI Proxy',
]);

$body = curl_exec($ch);
$err  = curl_error($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($body === false) {
  http_response_code(502);
  echo json_encode(['error' => 'Upstream request failed', 'details' => $err]);
  exit;
}

http_response_code($code ?: 200);
echo $body;
