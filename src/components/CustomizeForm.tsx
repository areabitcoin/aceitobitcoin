import { useState, useRef } from 'react';
import { Upload, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language, getTranslation } from '@/lib/translations';

export type AddressType = 'lightning' | 'silentPayment' | 'onChain';

interface FormData {
  businessName: string;
  businessDescription: string;
  address: string;
  addressType: AddressType;
  logoUrl: string;
  btcmapLink: string;
}

interface CustomizeFormProps {
  formData: FormData;
  onFormChange: (data: FormData) => void;
  language: Language;
}

export const CustomizeForm = ({ formData, onFormChange, language }: CustomizeFormProps) => {
  const t = getTranslation(language);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    handleChange('logoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="businessName">{t.businessName}</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
          placeholder={t.placeholder.businessName}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">{t.businessDescription}</Label>
        <Textarea
          id="description"
          value={formData.businessDescription}
          onChange={(e) => handleChange('businessDescription', e.target.value)}
          placeholder={t.placeholder.businessDescription}
          rows={2}
        />
      </div>

      {/* Address Type */}
      <div className="space-y-2">
        <Label>{t.addressType}</Label>
        <Select
          value={formData.addressType}
          onValueChange={(value: AddressType) => handleChange('addressType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lightning">{t.addressTypes.lightning}</SelectItem>
            <SelectItem value="silentPayment">{t.addressTypes.silentPayment}</SelectItem>
            <SelectItem value="onChain">{t.addressTypes.onChain}</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Tutorial Links */}
        {formData.addressType === 'lightning' && (
          <a
            href="https://blog.areabitcoin.com.br/lightning-address/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {language === 'pt' ? 'O que é Lightning Address?' : language === 'es' ? '¿Qué es Lightning Address?' : 'What is Lightning Address?'}
          </a>
        )}
        {formData.addressType === 'silentPayment' && (
          <a
            href="https://blog.areabitcoin.com.br/silent-payments/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {language === 'pt' ? 'O que é Silent Payment?' : language === 'es' ? '¿Qué es Silent Payment?' : 'What is Silent Payment?'}
          </a>
        )}
      </div>

      {/* Payment Address */}
      <div className="space-y-2">
        <Label htmlFor="address">{t.paymentAddress}</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder={t.placeholder.address}
          rows={3}
          className="font-mono text-sm"
        />
      </div>

      {/* BTCMap Link */}
      <div className="space-y-2">
        <Label htmlFor="btcmapLink">{t.btcmapLink}</Label>
        <Input
          id="btcmapLink"
          value={formData.btcmapLink}
          onChange={(e) => handleChange('btcmapLink', e.target.value)}
          placeholder={t.btcmapPlaceholder}
        />
        <a
          href="https://btcmap.org/add-location"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {language === 'pt' ? 'Adicione seu estabelecimento no BTCMap' : language === 'es' ? 'Añade tu establecimiento en BTCMap' : 'Add your business to BTCMap'}
        </a>
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <Label>{t.uploadLogo}</Label>
        
        {formData.logoUrl ? (
          <div className="relative inline-block">
            <img
              src={formData.logoUrl}
              alt="Logo preview"
              className="w-24 h-24 rounded-xl object-cover border border-border"
            />
            <button
              onClick={removeLogo}
              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Click to upload</span>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
