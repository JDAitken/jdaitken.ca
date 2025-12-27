<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

$configPath = dirname(__DIR__) . '/private/lead-config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['error' => 'Missing server config.']);
  exit;
}
$config = require $configPath;

// --- Basic rate limit (per IP, per minute) ---
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/lead_rl_' . preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $ip) . '_' . gmdate('YmdHi');
$count = 0;
if (file_exists($bucket)) {
  $count = (int)file_get_contents($bucket);
}
$count++;
file_put_contents($bucket, (string)$count);
$limit = (int)($config['RATE_LIMIT_PER_MIN'] ?? 8);
if ($count > $limit) {
  http_response_code(429);
  echo json_encode(['error' => 'Rate limit exceeded. Try again in a minute.']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid JSON.']);
  exit;
}

$email = trim($data['email'] ?? '');
$firstName = trim($data['firstName'] ?? '');
$phone = trim($data['phone'] ?? '');
$budget = trim($data['budget'] ?? '');
$url = trim($data['url'] ?? '');
$strategy = 'mobile'; // force mobile regardless of input
$honeypot = trim($data['website'] ?? '');
$report = $data['reportData'] ?? ($data['report'] ?? null);

if ($honeypot !== '') {
  http_response_code(400);
  echo json_encode(['error' => 'Bad request.']);
  exit;
}

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid email.']);
  exit;
}

if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid url.']);
  exit;
}

if (!is_array($report)) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing report data.']);
  exit;
}

// Sanitize header values to avoid injection
$cleanHeader = static function ($value) {
  return trim(preg_replace('/[\r\n]+/', ' ', (string)$value));
};

$perfScore = isset($report['perfScore']) ? (int)$report['perfScore'] : null;
$seoScore = isset($report['seoScore']) ? (int)$report['seoScore'] : null;
$lcpMs = isset($report['lcpMs']) && is_numeric($report['lcpMs']) ? (float)$report['lcpMs'] : null;
$inpMs = isset($report['inpMs']) && is_numeric($report['inpMs']) ? (float)$report['inpMs'] : null;
$cls = isset($report['cls']) && is_numeric($report['cls']) ? (float)$report['cls'] : null;

$opportunities = [];
if (!empty($report['opportunities']) && is_array($report['opportunities'])) {
  foreach ($report['opportunities'] as $opp) {
    if (!is_array($opp)) {
      continue;
    }
    $title = trim($opp['title'] ?? '');
    if ($title === '') {
      continue;
    }
    $savingsMs = null;
    if (isset($opp['savingsMs']) && is_numeric($opp['savingsMs'])) {
      $savingsMs = (int)$opp['savingsMs'];
    }
    $opportunities[] = [
      'title' => $title,
      'savingsMs' => $savingsMs,
    ];
    if (count($opportunities) >= 10) {
      break;
    }
  }
}

$host = parse_url($url, PHP_URL_HOST) ?: $url;

$formatMs = static function ($ms) {
  if (!is_numeric($ms)) {
    return '—';
  }
  if ($ms >= 1000) {
    return number_format($ms / 1000, 2) . ' s';
  }
  return round($ms) . ' ms';
};

$formatCls = static function ($value) {
  if (!is_numeric($value)) {
    return '—';
  }
  return number_format((float)$value, 3);
};

$perfText = is_numeric($perfScore) ? $perfScore . '/100' : '—';
$seoText = is_numeric($seoScore) ? $seoScore . '/100' : '—';
$oppCount = count($opportunities);
$safePhone = $cleanHeader($phone);
$safeBudget = $cleanHeader($budget);
$phoneLine = $safePhone !== '' ? 'Phone: ' . $safePhone : '';
$budgetLine = $safeBudget !== '' ? 'Budget: ' . $safeBudget : '';

$lines = [
  'Hi ' . ($firstName !== '' ? $firstName : 'there') . ',',
  '',
  "Here's your report for: " . $url,
  'Strategy: mobile',
  'Requested: ' . gmdate('c'),
  'We found ' . ($oppCount > 0 ? $oppCount . ' opportunities' : 'a few quick wins'),
  $phoneLine,
  $budgetLine,
  'Performance: ' . $perfText,
  '',
  'Core Web Vitals (lab):',
  '  LCP: ' . $formatMs($lcpMs),
  '  INP: ' . $formatMs($inpMs),
  '  CLS: ' . $formatCls($cls),
  '',
  'Full report:',
  'SEO Score: ' . $seoText,
  '',
  'Top 10 opportunities:',
];

if (!empty($opportunities)) {
  foreach ($opportunities as $idx => $opp) {
    $savings = is_numeric($opp['savingsMs']) ? ' (~' . $formatMs($opp['savingsMs']) . ')' : '';
    $lines[] = ($idx + 1) . ') ' . $opp['title'] . $savings;
  }
} else {
  $lines[] = 'No major opportunities detected.';
}

$lines[] = '';
$lines[] = 'If you want help fixing these, reply to this email and I’ll send 3 quick wins.';
$lines[] = '';
$lines[] = '— JD (jd@jdaitken.ca)';

$body = implode("\n", $lines);

$fromEmail = $cleanHeader($config['FROM_EMAIL'] ?? 'jd@jdaitken.ca');
$replyTo = $cleanHeader($config['REPLY_TO'] ?? $fromEmail);
$bccEmail = $cleanHeader($config['BCC_EMAIL'] ?? '');

$headers = [
  'From: JD Aitken <' . $fromEmail . '>',
  'Reply-To: ' . $replyTo,
  'Content-Type: text/plain; charset=UTF-8',
];
if ($bccEmail) {
  $headers[] = 'Bcc: ' . $bccEmail;
}

$subject = 'Your Speed Test Report: ' . $host;

$sent = mail($email, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
  http_response_code(500);
  echo json_encode(['error' => 'Could not send email.']);
  exit;
}

$logPath = $config['LEAD_LOG'] ?? dirname(__DIR__) . '/private/leads.csv';
$logDir = dirname($logPath);
if (!is_dir($logDir)) {
  mkdir($logDir, 0755, true);
}
$fp = fopen($logPath, 'a');
if ($fp) {
  fputcsv($fp, [gmdate('c'), $ip, $email, $firstName, $safePhone, $safeBudget, $url, 'mobile']);
  fclose($fp);
}

echo json_encode(['success' => true]);
