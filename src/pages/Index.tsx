import { useState } from 'react';
import { Settings2, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentCard } from '@/components/PaymentCard';
import { CustomizeForm, AddressType } from '@/components/CustomizeForm';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ShareWidget } from '@/components/ShareWidget';
import { UserGuide } from '@/components/UserGuide';
import { BitcoinSticker } from '@/components/BitcoinSticker';
import { Language, getTranslation } from '@/lib/translations';
import bitcoinLogo from '@/assets/bitcoin-logo.png';

interface FormData {
  businessName: string;
  businessDescription: string;
  address: string;
  addressType: AddressType;
  logoUrl: string;
  btcmapLink: string;
}

const Index = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const [activeTab, setActiveTab] = useState('preview');
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessDescription: '',
    address: '',
    addressType: 'lightning',
    logoUrl: '',
    btcmapLink: '',
  });

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border no-print">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={bitcoinLogo} alt="Bitcoin" className="w-10 h-10" />
              <div>
                <h1 className="font-bold text-lg">{t.title}</h1>
                <p className="text-xs text-muted-foreground">{t.poweredBy}</p>
              </div>
            </div>
            
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Print-only Card - This shows only when printing */}
          <div className="hidden print:block print:max-w-md print:mx-auto">
            <PaymentCard
              businessName={formData.businessName || t.title}
              businessDescription={formData.businessDescription}
              address={formData.address}
              addressType={formData.addressType}
              logoUrl={formData.logoUrl}
              btcmapLink={formData.btcmapLink}
              language={language}
            />
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden print:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="w-4 h-4" />
                  {t.preview}
                </TabsTrigger>
                <TabsTrigger value="customize" className="gap-2">
                  <Settings2 className="w-4 h-4" />
                  {t.customize}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-0 space-y-6">
                <PaymentCard
                  businessName={formData.businessName || t.title}
                  businessDescription={formData.businessDescription}
                  address={formData.address}
                  addressType={formData.addressType}
                  logoUrl={formData.logoUrl}
                  btcmapLink={formData.btcmapLink}
                  language={language}
                />
                <ShareWidget
                  businessName={formData.businessName || t.title}
                  address={formData.address}
                  language={language}
                />
              </TabsContent>

              <TabsContent value="customize" className="mt-0">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-primary" />
                    {t.customize}
                  </h2>
                  <CustomizeForm
                    formData={formData}
                    onFormChange={setFormData}
                    language={language}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 print:hidden">
            {/* Customize Panel */}
            <div>
              <div className="bg-card rounded-2xl p-8 border border-border sticky top-24">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  {t.customize}
                </h2>
                <CustomizeForm
                  formData={formData}
                  onFormChange={setFormData}
                  language={language}
                />
              </div>
            </div>

            {/* Preview Panel */}
            <div>
              <div className="sticky top-24 space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  {t.preview}
                </h2>
                <PaymentCard
                  businessName={formData.businessName || t.title}
                  businessDescription={formData.businessDescription}
                  address={formData.address}
                  addressType={formData.addressType}
                  logoUrl={formData.logoUrl}
                  btcmapLink={formData.btcmapLink}
                  language={language}
                />
                <ShareWidget
                  businessName={formData.businessName || t.title}
                  address={formData.address}
                  language={language}
                />
              </div>
            </div>
          </div>

          {/* Bitcoin Stickers - Full Width Below Cards */}
          <BitcoinSticker language={language} />

          {/* User Guide - Full Width Below Cards */}
          <UserGuide language={language} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16 no-print">
        <div className="container mx-auto px-4 text-center space-y-2">
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <img src={bitcoinLogo} alt="Bitcoin" className="w-4 h-4" />
            <span className="text-sm">{t.footer}</span>
          </div>
          
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {t.poweredBy}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Apoio{' '}
              <a
                href="https://areabitcoin.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Area Bitcoin
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
