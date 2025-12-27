<?php
// Override defaults for lead capture + email. Safe to commit; no API keys used.
return [
  'FROM_EMAIL' => 'jd@jdaitken.ca',
  'REPLY_TO' => 'jd@jdaitken.ca',
  'BCC_EMAIL' => 'jd@jdaitken.ca',
  // Store leads outside public root. Adjust path per host if needed.
  'LEAD_LOG' => __DIR__ . '/leads.csv',
  'RATE_LIMIT_PER_MIN' => 8,
];
