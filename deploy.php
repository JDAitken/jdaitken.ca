<?php

// Path to your deploy script (deploy.sh) inside public_html
$deployScript = __DIR__ . '/deploy.sh';

// Log file to help with debugging
$logFile = __DIR__ . '/deploy.log';

function logMessage($message) {
    global $logFile;
    file_put_contents($logFile, "[" . date('Y-m-d H:i:s') . "] " . $message . PHP_EOL, FILE_APPEND);
}

// Log that the webhook triggered
logMessage("Webhook received");

// Get payload from GitHub
$payload = file_get_contents('php://input');

// OPTIONAL security: if you want to add a webhook secret later, put it here
$secret = '';  // leave blank for now

// Validate webhook signature only if a secret is set
if (!empty($secret)) {
    $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
    $expected  = 'sha256=' . hash_hmac('sha256', $payload, $secret);

    if (!hash_equals($expected, $signature)) {
        logMessage("Invalid signature");
        http_response_code(403);
        exit("Invalid signature");
    }
}

// Run deploy.sh
logMessage("Running deploy.sh...");
exec("sh $deployScript 2>&1", $output, $result);

// Log deploy output
logMessage("Deploy output: " . implode("\n", $output));
logMessage("Return code: $result");

// Respond to GitHub
if ($result === 0) {
    http_response_code(200);
    echo "Deployment succeeded";
    logMessage("Deployment succeeded");
} else {
    http_response_code(500);
    echo "Deployment failed";
    logMessage("Deployment failed");
}

?>
