import { useState, forwardRef } from 'react';
import { Copy, Check, Printer, Zap, MapPin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCodeDisplay } from './QRCodeDisplay';
import { BitcoinIcon } from './BitcoinIcon';
import { Language, getTranslation } from '@/lib/translations';
import bitcoinLogo from '@/assets/bitcoin-logo.png';
import areaBitcoinLogo from '@/assets/area-bitcoin-logo.png';
import html2canvas from 'html2canvas';

interface PaymentCardProps {
  businessName: string;
  businessDescription?: string;
  address: string;
  addressType: 'lightning' | 'silentPayment' | 'onChain';
  logoUrl?: string;
  btcmapLink?: string;
  language: Language;
}

export const PaymentCard = forwardRef<HTMLDivElement, PaymentCardProps>(({
  businessName,
  businessDescription,
  address,
  addressType,
  logoUrl,
  btcmapLink,
  language,
}, ref) => {
  const [copied, setCopied] = useState(false);
  const t = getTranslation(language);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const cardElement = typeof ref === 'function' ? null : ref?.current;
    if (!cardElement) return;
    
    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `${businessName || 'bitcoin-payment'}-qrcode.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const getAddressTypeIcon = () => {
    if (addressType === 'lightning') {
      return <Zap className="w-4 h-4" />;
    }
    return <BitcoinIcon className="w-4 h-4" />;
  };

  const truncateAddress = (addr: string) => {
    if (addr.length <= 30) return addr;
    return `${addr.slice(0, 15)}...${addr.slice(-15)}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Card */}
      <div ref={ref} className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
        {/* Header */}
        <div className="bitcoin-gradient p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/20" />
          </div>
          
          <div className="relative z-10">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={businessName}
                className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover bg-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 bg-white flex items-center justify-center shadow-lg">
                <img src={bitcoinLogo} alt="Bitcoin" className="w-16 h-16" />
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-white mb-1">
              {businessName || t.title}
            </h1>
            {businessDescription && (
              <p className="text-white/80 text-sm">{businessDescription}</p>
            )}
          </div>
        </div>

        {/* QR Section */}
        <div className="p-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bitcoin-light text-primary rounded-full text-sm font-medium">
              {getAddressTypeIcon()}
              {t.addressTypes[addressType]}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-foreground mb-4">
            {t.scanQR}
          </h2>

          <QRCodeDisplay value={address} size={200} />

          <p className="text-muted-foreground text-sm mt-6 mb-3">
            {t.orCopyAddress}
          </p>

          {/* Address Display */}
          <div className="w-full bg-muted rounded-xl p-4">
            <p className="text-sm text-center font-mono text-foreground break-all mb-3">
              {address ? truncateAddress(address) : '---'}
            </p>
            
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full"
              disabled={!address}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  {t.copyAddress}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 pt-2 border-t border-border/50">
          {/* Location Link - Centered */}
          {btcmapLink && (
            <a
              href={btcmapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-3 py-2 px-4 bg-bitcoin-light/50 rounded-full mx-auto w-fit"
            >
              <MapPin className="w-4 h-4" />
              <span>{t.findOnMap}</span>
            </a>
          )}
          
          {/* Area Bitcoin Branding */}
          <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
            <span className="text-[10px]">
              {language === 'pt' ? 'Apoio' : language === 'es' ? 'Apoyo' : 'Powered by'}
            </span>
            <a
              href="https://areabitcoin.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <img 
                src={areaBitcoinLogo} 
                alt="Area Bitcoin" 
                className="h-4 w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-3 no-print">
        <Button onClick={handleDownload} variant="default" size="lg" className="gap-2">
          <Download className="w-4 h-4" />
          {t.download}
        </Button>
        <Button onClick={handlePrint} variant="outline" size="lg" className="gap-2">
          <Printer className="w-4 h-4" />
          {t.print}
        </Button>
      </div>
    </div>
  );
});

PaymentCard.displayName = 'PaymentCard';
