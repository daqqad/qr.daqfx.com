const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code Generator</title>
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #0f0f0f;
      color: #e0e0e0;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      gap: 24px;
    }

    h1 {
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      color: #888;
      text-transform: uppercase;
    }

    .container {
      width: 100%;
      max-width: 560px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    textarea {
      width: 100%;
      height: 160px;
      padding: 14px 16px;
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      color: #e0e0e0;
      font-size: 1rem;
      font-family: "SF Mono", "Fira Code", monospace;
      resize: vertical;
      outline: none;
      transition: border-color 0.15s;
    }

    textarea:focus {
      border-color: #444;
    }

    textarea::placeholder {
      color: #444;
    }

    #qr-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 260px;
    }

    #qr-wrap canvas {
      border-radius: 8px;
      background: #fff;
      padding: 16px;
    }

    #hint {
      font-size: 0.8rem;
      color: #555;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>QR Share</h1>
  <div class="container">
    <textarea id="input" placeholder="Paste text here…" autofocus></textarea>
    <div id="qr-wrap">
      <span id="hint">Type or paste text above to generate a QR code</span>
    </div>
  </div>

  <script>
    const input = document.getElementById('input');
    const wrap = document.getElementById('qr-wrap');
    let canvas = null;
    let debounceTimer = null;

    function render(text) {
      if (!text) {
        wrap.innerHTML = '<span id="hint">Type or paste text above to generate a QR code</span>';
        canvas = null;
        return;
      }

      if (!canvas) {
        canvas = document.createElement('canvas');
        wrap.innerHTML = '';
        wrap.appendChild(canvas);
      }

      QRCode.toCanvas(canvas, text, {
        width: Math.min(280, window.innerWidth - 80),
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'M',
      }, function(err) {
        if (err) {
          wrap.innerHTML = '<span id="hint" style="color:#e05;">Text too long for QR code</span>';
          canvas = null;
        }
      });
    }

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => render(input.value.trim()), 150);
    });

    // Restore from URL hash if present
    if (location.hash) {
      try {
        const decoded = decodeURIComponent(location.hash.slice(1));
        input.value = decoded;
        render(decoded);
      } catch(e) {}
    }
  </script>
</body>
</html>`;

export default {
  async fetch(request) {
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  },
};
