'use client';
import { useEffect, useRef, useState } from 'react';

interface EmulatorContainerProps {
  romUrl: string;
}

export default function EmulatorContainer({ romUrl }: EmulatorContainerProps) {
  const [srcDoc, setSrcDoc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!romUrl) {
      setSrcDoc('');
      return;
    }

    // When romUrl changes, generate new HTML for the iframe
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            /* Make body fill the iframe completely */
            html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: black; }
            #game { width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <!-- The container where EmulatorJS will render -->
          <div id="game"></div>

          <script>
            // Expose EJS_* on window inside the iframe
            window.EJS_player = '#game';
            window.EJS_core = 'nes';
            window.EJS_pathtodata = 'https://cdn.emulatorjs.org/latest/data/';
            window.EJS_gameUrl = '${romUrl}';
          </script>
          <!-- Load EmulatorJS’s loader.js -->
          <script
            src="https://cdn.emulatorjs.org/latest/data/loader.js"
            onerror="console.error('Failed to load EmulatorJS loader.js')"
          ></script>

          <script>
            // Ensure the game auto-starts (EmulatorJS does that by default once script loads)
            // Optionally, if you need to force-run EJS, you can do so here.
          </script>
        </body>
      </html>
    `.trim();

    setSrcDoc(html);
  }, [romUrl]);

  // Whenever romUrl changes or mounts, React will reload the <iframe> with new srcDoc.
  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-same-origin"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}
