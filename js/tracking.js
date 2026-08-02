// JD Media analytics + ad tracking — single source of truth for all tracking IDs.
// Loaded synchronously (no defer) in <head> so pixels are ready before any fast form submit.
// Update an ID here and it propagates to every page — no more per-page copy-paste.

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

// GA4
gtag('config', 'G-9Q56QL24ES');

// Google Ads conversion tracking — replace AW-PLACEHOLDER with the real ID from
// Google Ads > Goals > Conversions > New conversion action > Website.
gtag('config', 'AW-PLACEHOLDER');

(function loadGtagJs() {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-9Q56QL24ES';
  document.head.appendChild(s);
})();

// Meta Pixel
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1285414636910501');
fbq('track', 'PageView');

// Single lead-conversion helper — call once per real form submission, never on page load.
// source: a short label ('contact', 'audit', 'hi', 'lp') for per-channel attribution.
window.jdTrackLead = function (source) {
  gtag('event', 'generate_lead', { form: source || 'lead-form', page: window.location.pathname });
  // Replace AW-PLACEHOLDER/LABEL with the real send-to label once the conversion action exists.
  gtag('event', 'conversion', { send_to: 'AW-PLACEHOLDER/LABEL' });
  fbq('track', 'Lead');
};
