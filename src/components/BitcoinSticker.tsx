import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import type { Language } from '@/lib/translations';
import bitcoinLogo from '@/assets/bitcoin-logo-sticker.png';

interface BitcoinStickerProps {
  language: Language;
}

const translations = {
  pt: {
    title: 'Adesivos para Impressão',
    subtitle: 'Baixe e imprima para colar na fachada ou balcão',
    download: 'Baixar',
    print: 'Imprimir',
    acceptedHere: 'Aceito Aqui',
    lightVersion: 'Versão Clara',
    darkVersion: 'Versão Escura',
  },
  en: {
    title: 'Printable Stickers',
    subtitle: 'Download and print to display at your store',
    download: 'Download',
    print: 'Print',
    acceptedHere: 'Accepted Here',
    lightVersion: 'Light Version',
    darkVersion: 'Dark Version',
  },
  es: {
    title: 'Adhesivos para Imprimir',
    subtitle: 'Descarga e imprime para colocar en tu tienda',
    download: 'Descargar',
    print: 'Imprimir',
    acceptedHere: 'Aceptado Aquí',
    lightVersion: 'Versión Clara',
    darkVersion: 'Versión Oscura',
  },
};

export const BitcoinSticker = ({ language }: BitcoinStickerProps) => {
  const lightStickerRef = useRef<HTMLDivElement>(null);
  const darkStickerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const handleDownload = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return;

    try {
      // html2canvas can mis-measure text if web fonts aren't fully loaded yet.
      // Waiting for fonts makes the PNG layout match what you see on screen.
      await document.fonts?.ready;
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const canvas = await html2canvas(ref.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating sticker image:', error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get the absolute URL for the logo
    const logoUrl = new URL(bitcoinLogo, window.location.origin).href;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bitcoin ${t.acceptedHere}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
              gap: 40px;
            }
            .sticker {
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 20px 40px;
              border-radius: 12px;
              width: 400px;
            }
            .sticker-light {
              background: #f5f5f5;
              border: 2px solid #e0e0e0;
            }
            .sticker-dark {
              background: #1a1a1a;
            }
            .logo {
              width: 80px;
              height: 80px;
              flex-shrink: 0;
            }
            .logo img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            .text {
              display: flex;
              flex-direction: column;
            }
            .bitcoin-text {
              font-size: 36px;
              font-weight: bold;
              letter-spacing: -1px;
            }
            .bitcoin-text-dark { color: #4a4a4a; }
            .bitcoin-text-light { color: white; }
            .accepted-text {
              font-size: 18px;
              font-weight: 600;
              letter-spacing: 2px;
              text-transform: uppercase;
            }
            .accepted-text-dark { color: #f7931a; }
            .accepted-text-light { color: #f7931a; }
            @media print {
              body { gap: 60px; }
            }
          </style>
        </head>
        <body>
          <div class="sticker sticker-light">
            <div class="logo"><img src="${logoUrl}" alt="Bitcoin" /></div>
            <div class="text">
              <span class="bitcoin-text bitcoin-text-dark">Bitcoin</span>
              <span class="accepted-text accepted-text-dark">${t.acceptedHere.toUpperCase()}</span>
            </div>
          </div>
          <div class="sticker sticker-dark">
            <div class="logo"><img src="${logoUrl}" alt="Bitcoin" /></div>
            <div class="text">
              <span class="bitcoin-text bitcoin-text-light">Bitcoin</span>
              <span class="accepted-text accepted-text-light">${t.acceptedHere.toUpperCase()}</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <section className="w-full py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t.title}
          </h2>
          <p className="text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Light Version */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground font-medium">{t.lightVersion}</p>
            <div
              ref={lightStickerRef}
              className="flex items-center gap-4 rounded-xl border-2 px-6 py-4 md:px-8 md:py-5"
              style={{
                backgroundColor: 'hsl(var(--sticker-light-bg))',
                borderColor: 'hsl(var(--sticker-light-border))',
              }}
            >
              <img
                data-sticker-logo
                src={bitcoinLogo}
                alt="Bitcoin"
                className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
              />
              <div className="flex flex-col">
                <span
                  data-sticker-title
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: 'hsl(var(--sticker-light-text))' }}
                >
                  Bitcoin
                </span>
                <span
                  data-sticker-subtitle
                  className="text-sm md:text-base font-semibold text-bitcoin tracking-widest uppercase"
                >
                  {t.acceptedHere}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(lightStickerRef, 'bitcoin-aceito-aqui-claro.png')}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {t.download}
              </Button>
            </div>
          </div>

          {/* Dark Version */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground font-medium">{t.darkVersion}</p>
            <div
              ref={darkStickerRef}
              className="flex items-center gap-4 rounded-xl px-6 py-4 md:px-8 md:py-5"
              style={{ backgroundColor: 'hsl(var(--sticker-dark-bg))' }}
            >
              <img
                data-sticker-logo
                src={bitcoinLogo}
                alt="Bitcoin"
                className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
              />
              <div className="flex flex-col">
                <span
                  data-sticker-title
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: 'hsl(var(--sticker-dark-text))' }}
                >
                  Bitcoin
                </span>
                <span
                  data-sticker-subtitle
                  className="text-sm md:text-base font-semibold text-bitcoin tracking-widest uppercase"
                >
                  {t.acceptedHere}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(darkStickerRef, 'bitcoin-aceito-aqui-escuro.png')}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {t.download}
              </Button>
            </div>
          </div>
        </div>

        {/* Print Both Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handlePrint}
            className="gap-2 bg-bitcoin hover:bg-bitcoin/90 text-white"
          >
            <Printer className="h-4 w-4" />
            {t.print} {t.lightVersion} & {t.darkVersion}
          </Button>
        </div>
      </div>
    </section>
  );
};
