import { QRCodeSVG } from 'qrcode.react';
import { BitcoinIcon } from './BitcoinIcon';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export const QRCodeDisplay = ({ value, size = 220 }: QRCodeDisplayProps) => {
  if (!value) {
    return (
      <div 
        className="flex items-center justify-center bg-muted rounded-xl"
        style={{ width: size, height: size }}
      >
        <BitcoinIcon className="w-16 h-16 text-muted-foreground/30" />
      </div>
    );
  }

  return (
    <div className="relative p-4 bg-white rounded-xl shadow-lg">
      <QRCodeSVG
        value={value}
        size={size}
        level="M"
        includeMargin={false}
        bgColor="#FFFFFF"
        fgColor="#1a1a1a"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <BitcoinIcon className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};
