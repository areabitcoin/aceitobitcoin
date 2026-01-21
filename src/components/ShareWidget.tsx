import { Share2, Mail, Link2, Check, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/translations';
import { useState, RefObject } from 'react';
import html2canvas from 'html2canvas';

interface ShareWidgetProps {
  businessName: string;
  address: string;
  language: Language;
  cardRef?: RefObject<HTMLDivElement>;
}

// Custom X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Instagram Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Custom Telegram Icon
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// Custom WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const translations = {
  pt: {
    shareTitle: 'Compartilhar',
    shareDescription: 'Compartilhe que você aceita Bitcoin!',
    copyLink: 'Copiar Link',
    copied: 'Copiado!',
    shareText: (name: string) => `${name} aceita Bitcoin! Pague de forma rápida e segura.`,
    embedCode: 'Incorporar',
    embedCopied: 'Código copiado!',
    embedTitle: 'Código para incorporar no seu site',
  },
  en: {
    shareTitle: 'Share',
    shareDescription: 'Share that you accept Bitcoin!',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    shareText: (name: string) => `${name} accepts Bitcoin! Pay quickly and securely.`,
    embedCode: 'Embed',
    embedCopied: 'Code copied!',
    embedTitle: 'Embed code for your website',
  },
  es: {
    shareTitle: 'Compartir',
    shareDescription: '¡Comparte que aceptas Bitcoin!',
    copyLink: 'Copiar Enlace',
    copied: '¡Copiado!',
    shareText: (name: string) => `¡${name} acepta Bitcoin! Paga de forma rápida y segura.`,
    embedCode: 'Incorporar',
    embedCopied: '¡Código copiado!',
    embedTitle: 'Código para incorporar en tu sitio',
  },
};

export const ShareWidget = ({ businessName, address, language, cardRef }: ShareWidgetProps) => {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const t = translations[language];

  // Generate card image for sharing
  const generateCardImage = async (): Promise<File | null> => {
    if (!cardRef?.current) return null;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${businessName || 'bitcoin-payment'}.png`, {
              type: 'image/png',
            });
            resolve(file);
          } else {
            resolve(null);
          }
        }, 'image/png');
      });
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  };

  // Share with native share API (for Instagram Stories, etc.)
  const handleNativeShare = async () => {
    setIsSharing(true);
    
    try {
      const imageFile = await generateCardImage();
      
      if (imageFile && navigator.canShare?.({ files: [imageFile] })) {
        await navigator.share({
          files: [imageFile],
          title: shareText,
          text: shareText,
        });
      } else if (navigator.share) {
        // Fallback to text-only share if files not supported
        await navigator.share({
          title: shareText,
          text: `${shareText}\n${currentUrl}`,
          url: currentUrl,
        });
      } else {
        // Fallback to copying link
        await navigator.clipboard.writeText(`${shareText}\n${currentUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // User cancelled or error - just ignore
      console.log('Share cancelled or failed:', error);
    } finally {
      setIsSharing(false);
    }
  };
  
  const shareText = t.shareText(businessName || 'Nosso negócio');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`,
      color: 'hover:bg-green-500/10 hover:text-green-500',
    },
    {
      name: 'Telegram',
      icon: TelegramIcon,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-blue-500/10 hover:text-blue-500',
    },
    {
      name: 'X',
      icon: XIcon,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-foreground/10 hover:text-foreground',
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: '#',
      color: 'hover:bg-pink-500/10 hover:text-pink-500',
      onClick: handleNativeShare,
      isLoading: isSharing,
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${currentUrl}\n\nEndereço: ${address}`)}`,
      color: 'hover:bg-orange-500/10 hover:text-orange-500',
    },
  ];

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const embedCode = `<iframe src="${currentUrl}?embed=true" width="400" height="500" frameborder="0" style="border-radius: 16px; max-width: 100%;"></iframe>`;

  const handleCopyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
    setEmbedCopied(true);
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">{t.shareTitle}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-5">
        {t.shareDescription}
      </p>

      {/* Social Buttons */}
      <div className="flex flex-wrap gap-3 mb-5">
        {shareLinks.map((social) => {
          const Icon = social.icon;
          const isLoading = 'isLoading' in social && social.isLoading;
          return (
            <a
              key={social.name}
              href={social.url}
              target={social.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (social.onClick) {
                  e.preventDefault();
                  social.onClick();
                }
              }}
              className={`flex items-center justify-center w-12 h-12 rounded-xl border border-border bg-background transition-all ${social.color} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
              title={social.name}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </a>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              {t.copied}
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              {t.copyLink}
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => setShowEmbed(!showEmbed)}
        >
          <Code className="w-4 h-4" />
          {t.embedCode}
        </Button>
      </div>

      {/* Embed Code Section */}
      {showEmbed && (
        <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border">
          <p className="text-sm font-medium mb-2">{t.embedTitle}</p>
          <div className="relative">
            <pre className="text-xs bg-background p-3 rounded-lg border border-border overflow-x-auto whitespace-pre-wrap break-all">
              {embedCode}
            </pre>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2 gap-1"
              onClick={handleCopyEmbed}
            >
              {embedCopied ? (
                <>
                  <Check className="w-3 h-3 text-green-500" />
                  {t.embedCopied}
                </>
              ) : (
                <>
                  <Code className="w-3 h-3" />
                  {t.embedCode}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
