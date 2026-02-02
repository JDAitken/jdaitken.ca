<?php
declare(strict_types=1);

const RECIPIENT_EMAIL = 'REPLACE_WITH_MY_EMAIL';
const FROM_EMAIL = 'no-reply@jdaitken.ca';
const SUBJECT = 'JD Aitken — New Website Lead';
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 3600;
const RATE_LIMIT_DIR = __DIR__ . '/ratelimit';

function redirect_to(string $path): void {
  header('Location: ' . $path, true, 303);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  redirect_to('/contact.html?error=1');
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$timestamp = time();

if (!is_dir(RATE_LIMIT_DIR)) {
  @mkdir(RATE_LIMIT_DIR, 0755, true);
}

if (!is_dir(RATE_LIMIT_DIR) || !is_writable(RATE_LIMIT_DIR)) {
  redirect_to('/contact.html?error=1');
}

$ipKey = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $ip);
$rateFile = RATE_LIMIT_DIR . '/' . $ipKey . '.json';
$entries = [];

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
  redirect_to('/contact.html?error=1');
}

$entries[] = $timestamp;
file_put_contents($rateFile, json_encode($entries), LOCK_EX);

$gotcha = trim((string)($_POST['_gotcha'] ?? ''));
if ($gotcha !== '') {
  redirect_to('/contact.html?error=1');
}

$name = trim(strip_tags((string)($_POST['name'] ?? '')));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim(strip_tags((string)($_POST['phone'] ?? '')));
$message = trim(strip_tags((string)($_POST['message'] ?? '')));

$name = mb_substr($name, 0, 80);
$phone = mb_substr($phone, 0, 40);
$message = mb_substr($message, 0, 2000);
$email = str_replace(["\r", "\n"], '', $email);

if (mb_strlen($name) < 2) {
  redirect_to('/contact.html?error=1');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  redirect_to('/contact.html?error=1');
}

if (mb_strlen($message) < 10) {
  redirect_to('/contact.html?error=1');
}

$referrer = $_SERVER['HTTP_REFERER'] ?? '';
$ipSafe = $ip;
$timeString = date('Y-m-d H:i:s T', $timestamp);

$bodyLines = [
  "Name: {$name}",
  "Email: {$email}",
  "Phone: " . ($phone !== '' ? $phone : 'N/A'),
  "Message:",
  $message,
  "",
  "Referrer: " . ($referrer !== '' ? $referrer : 'N/A'),
  "IP: {$ipSafe}",
  "Time: {$timeString}"
];

$body = implode("\n", $bodyLines);

$headers = [
  'From: JD Aitken <' . FROM_EMAIL . '>',
  'Reply-To: ' . $email,
  'Content-Type: text/plain; charset=UTF-8'
];

$mailSent = @mail(RECIPIENT_EMAIL, SUBJECT, $body, implode("\r\n", $headers));

if ($mailSent) {
  redirect_to('/thanks.html');
}

redirect_to('/contact.html?error=1');
