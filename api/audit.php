<?php
declare(strict_types=1);

const RECIPIENT_EMAIL = 'jd@jdaitken.ca';
const FROM_EMAIL      = 'no-reply@jdaitken.ca';
const SUBJECT         = 'JD Media — New Audit Request';
const RATE_LIMIT_MAX    = 10;
const RATE_LIMIT_WINDOW = 3600;
const RATE_LIMIT_DIR    = __DIR__ . '/ratelimit';

header('Content-Type: application/json');

function json_error(int $code, string $message): never {
  http_response_code($code);
  echo json_encode(['error' => $message]);
  exit;
}

function json_success(): never {
  echo json_encode(['success' => true]);
  exit;
}

// POST only
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  json_error(405, 'Method not allowed.');
}

// Rate limiting (same IP-file pattern as contact.php)
$ip        = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$timestamp = time();

if (!is_dir(RATE_LIMIT_DIR)) {
  @mkdir(RATE_LIMIT_DIR, 0755, true);
}

if (!is_dir(RATE_LIMIT_DIR) || !is_writable(RATE_LIMIT_DIR)) {
  json_error(500, 'Something went wrong. Please email jd@jdaitken.ca directly.');
}

$ipKey    = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $ip);
$rateFile = RATE_LIMIT_DIR . '/' . $ipKey . '.json';
$entries  = [];

if (is_file($rateFile)) {
  $raw = file_get_contents($rateFile);
  if ($raw !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
      $entries = $decoded;
    }
  }
}

$entries = array_values(array_filter($entries, static function ($entry) use ($timestamp) {
  return is_int($entry) && ($timestamp - $entry) < RATE_LIMIT_WINDOW;
}));

if (count($entries) >= RATE_LIMIT_MAX) {
  json_error(429, 'Too many requests. Please try again later.');
}

$entries[] = $timestamp;
file_put_contents($rateFile, json_encode($entries), LOCK_EX);

// Honeypot — silent discard
$gotcha = trim((string)($_POST['_gotcha'] ?? ''));
if ($gotcha !== '') {
  json_success();
}

// Fields
$website = trim(strip_tags((string)($_POST['website_url'] ?? '')));
$email   = trim((string)($_POST['email'] ?? ''));
$email   = str_replace(["\r", "\n"], '', $email);
$website = mb_substr($website, 0, 200);

// Validation
if (mb_strlen($website) < 3) {
  json_error(422, 'Please enter your website URL.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_error(422, 'Please enter a valid email address.');
}

// Email
$timeString = date('Y-m-d H:i:s T', $timestamp);
$referrer   = $_SERVER['HTTP_REFERER'] ?? 'N/A';

$body = implode("\n", [
  'New audit request',
  '',
  "Website: {$website}",
  "Email:   {$email}",
  '',
  "Referrer: {$referrer}",
  "IP:       {$ip}",
  "Time:     {$timeString}",
]);

$headers = implode("\r\n", [
  'From: JD Media <' . FROM_EMAIL . '>',
  'Reply-To: ' . $email,
  'Content-Type: text/plain; charset=UTF-8',
]);

$sent = @mail(RECIPIENT_EMAIL, SUBJECT, $body, $headers);

if ($sent) {
  json_success();
}

json_error(500, 'Something went wrong. Please email jd@jdaitken.ca directly.');
