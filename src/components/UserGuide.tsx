import { BookOpen, Zap, Wallet, Shield, MapPin, GraduationCap, ExternalLink } from 'lucide-react';
import { Language } from '@/lib/translations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface UserGuideProps {
  language: Language;
}

const guideContent = {
  pt: {
    title: 'Como usar este modelo',
    subtitle: 'Guia rápido para comerciantes',
    steps: [
      {
        icon: Wallet,
        title: '1. Configure sua carteira',
        description: 'Primeiro, você precisa de uma carteira Bitcoin que suporte Lightning Network. Use carteiras como: Wallet of Satoshi, Phoenix, Blue Wallet, Sparrow, etc.',
        walletGuideLink: 'https://blog.areabitcoin.com.br/guia-de-carteiras-lightning/',
      },
      {
        icon: Zap,
        title: '2. Copie seu endereço Lightning',
        description: 'Na sua carteira, encontre seu Lightning Address (geralmente no formato usuario@carteira.com) e cole no campo "Endereço de Pagamento".',
      },
      {
        icon: BookOpen,
        title: '3. Personalize seu card',
        description: 'Adicione o nome do seu negócio, uma descrição opcional e seu logo para criar um card personalizado.',
      },
      {
        icon: MapPin,
        title: '4. Imprima e divulgue',
        description: 'Clique em "Imprimir" para criar seu material. Cole no balcão, na porta ou onde seus clientes possam ver!',
      },
    ],
    faq: {
      title: 'Dúvidas Frequentes',
      items: [
        {
          question: 'O que é Lightning Address?',
          answer: 'É um endereço simples (como email) que permite receber pagamentos Bitcoin instantâneos via Lightning Network. Exemplo: loja@walletofsatoshi.com',
        },
        {
          question: 'O que é Silent Payment?',
          answer: 'É uma tecnologia avançada que gera endereços únicos para cada transação, aumentando sua privacidade. Ideal para quem busca máxima segurança.',
        },
        {
          question: 'Preciso pagar algo para usar?',
          answer: 'Este modelo é 100% gratuito! Você só precisa ter uma carteira Bitcoin para receber os pagamentos.',
        },
        {
          question: 'Como o cliente paga?',
          answer: 'O cliente escaneia o QR Code com a carteira Bitcoin dele, digita o valor e confirma. O pagamento chega em segundos!',
        },
      ],
    },
    resources: {
      title: 'Aprenda mais com a Area Bitcoin',
      items: [
        {
          title: 'Como aceitar Bitcoin no seu negócio',
          description: 'Guia completo sobre vantagens e como começar',
          url: 'https://blog.areabitcoin.com.br/encontrar-lugares-que-aceitam-bitcoin/',
          icon: GraduationCap,
        },
        {
          title: 'O que é Lightning Network?',
          description: 'Entenda a tecnologia por trás dos pagamentos instantâneos',
          url: 'https://blog.areabitcoin.com.br/o-que-sao-os-nodes-de-bitcoin-e-lightning/',
          icon: Zap,
        },
        {
          title: 'Silent Payments explicado',
          description: 'Saiba como funciona esta tecnologia de privacidade',
          url: 'https://blog.areabitcoin.com.br/silent-payments/',
          icon: Shield,
        },
        {
          title: 'Tutorial Wallet of Satoshi',
          description: 'Aprenda a usar a carteira mais simples para Lightning',
          url: 'https://blog.areabitcoin.com.br/wallet-of-satoshi/',
          icon: Wallet,
        },
      ],
    },
  },
  en: {
    title: 'How to use this template',
    subtitle: 'Quick guide for merchants',
    steps: [
      {
        icon: Wallet,
        title: '1. Set up your wallet',
        description: 'First, you need a Bitcoin wallet that supports Lightning Network. Use wallets like: Wallet of Satoshi, Phoenix, Blue Wallet, Sparrow, etc.',
        walletGuideLink: 'https://blog.areabitcoin.com.br/guia-de-carteiras-lightning/',
      },
      {
        icon: Zap,
        title: '2. Copy your Lightning address',
        description: 'In your wallet, find your Lightning Address (usually in the format user@wallet.com) and paste it in the "Payment Address" field.',
      },
      {
        icon: BookOpen,
        title: '3. Customize your card',
        description: 'Add your business name, an optional description, and your logo to create a personalized card.',
      },
      {
        icon: MapPin,
        title: '4. Print and share',
        description: 'Click "Print" to create your material. Place it on the counter, door, or wherever your customers can see it!',
      },
    ],
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is a Lightning Address?',
          answer: 'It\'s a simple address (like email) that allows you to receive instant Bitcoin payments via Lightning Network. Example: store@walletofsatoshi.com',
        },
        {
          question: 'What is Silent Payment?',
          answer: 'It\'s an advanced technology that generates unique addresses for each transaction, increasing your privacy. Ideal for those seeking maximum security.',
        },
        {
          question: 'Do I need to pay anything to use this?',
          answer: 'This template is 100% free! You only need a Bitcoin wallet to receive payments.',
        },
        {
          question: 'How does the customer pay?',
          answer: 'The customer scans the QR Code with their Bitcoin wallet, enters the amount, and confirms. Payment arrives in seconds!',
        },
      ],
    },
    resources: {
      title: 'Learn more with Area Bitcoin',
      items: [
        {
          title: 'How to accept Bitcoin in your business',
          description: 'Complete guide on advantages and how to start',
          url: 'https://blog.areabitcoin.com.br/encontrar-lugares-que-aceitam-bitcoin/',
          icon: GraduationCap,
        },
        {
          title: 'What is Lightning Network?',
          description: 'Understand the technology behind instant payments',
          url: 'https://blog.areabitcoin.com.br/o-que-sao-os-nodes-de-bitcoin-e-lightning/',
          icon: Zap,
        },
        {
          title: 'Silent Payments explained',
          description: 'Learn how this privacy technology works',
          url: 'https://blog.areabitcoin.com.br/silent-payments/',
          icon: Shield,
        },
        {
          title: 'Wallet of Satoshi Tutorial',
          description: 'Learn to use the simplest Lightning wallet',
          url: 'https://blog.areabitcoin.com.br/wallet-of-satoshi/',
          icon: Wallet,
        },
      ],
    },
  },
  es: {
    title: 'Cómo usar esta plantilla',
    subtitle: 'Guía rápida para comerciantes',
    steps: [
      {
        icon: Wallet,
        title: '1. Configura tu billetera',
        description: 'Primero, necesitas una billetera Bitcoin que soporte Lightning Network. Usa billeteras como: Wallet of Satoshi, Phoenix, Blue Wallet, Sparrow, etc.',
        walletGuideLink: 'https://blog.areabitcoin.com.br/guia-de-carteiras-lightning/',
      },
      {
        icon: Zap,
        title: '2. Copia tu dirección Lightning',
        description: 'En tu billetera, encuentra tu Lightning Address (generalmente en formato usuario@billetera.com) y pégala en el campo "Dirección de Pago".',
      },
      {
        icon: BookOpen,
        title: '3. Personaliza tu tarjeta',
        description: 'Agrega el nombre de tu negocio, una descripción opcional y tu logo para crear una tarjeta personalizada.',
      },
      {
        icon: MapPin,
        title: '4. Imprime y comparte',
        description: '¡Haz clic en "Imprimir" para crear tu material. Colócalo en el mostrador, puerta o donde tus clientes puedan verlo!',
      },
    ],
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        {
          question: '¿Qué es una Lightning Address?',
          answer: 'Es una dirección simple (como email) que permite recibir pagos Bitcoin instantáneos vía Lightning Network. Ejemplo: tienda@walletofsatoshi.com',
        },
        {
          question: '¿Qué es Silent Payment?',
          answer: 'Es una tecnología avanzada que genera direcciones únicas para cada transacción, aumentando tu privacidad. Ideal para quienes buscan máxima seguridad.',
        },
        {
          question: '¿Necesito pagar algo para usarlo?',
          answer: '¡Esta plantilla es 100% gratuita! Solo necesitas una billetera Bitcoin para recibir los pagos.',
        },
        {
          question: '¿Cómo paga el cliente?',
          answer: 'El cliente escanea el código QR con su billetera Bitcoin, ingresa el monto y confirma. ¡El pago llega en segundos!',
        },
      ],
    },
    resources: {
      title: 'Aprende más con Area Bitcoin',
      items: [
        {
          title: 'Cómo aceptar Bitcoin en tu negocio',
          description: 'Guía completa sobre ventajas y cómo empezar',
          url: 'https://blog.areabitcoin.com.br/encontrar-lugares-que-aceitam-bitcoin/',
          icon: GraduationCap,
        },
        {
          title: '¿Qué es Lightning Network?',
          description: 'Entiende la tecnología detrás de los pagos instantáneos',
          url: 'https://blog.areabitcoin.com.br/o-que-sao-os-nodes-de-bitcoin-e-lightning/',
          icon: Zap,
        },
        {
          title: 'Silent Payments explicado',
          description: 'Aprende cómo funciona esta tecnología de privacidad',
          url: 'https://blog.areabitcoin.com.br/silent-payments/',
          icon: Shield,
        },
        {
          title: 'Tutorial Wallet of Satoshi',
          description: 'Aprende a usar la billetera más simple para Lightning',
          url: 'https://blog.areabitcoin.com.br/wallet-of-satoshi/',
          icon: Wallet,
        },
      ],
    },
  },
};

export const UserGuide = ({ language }: UserGuideProps) => {
  const content = guideContent[language];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 space-y-8 no-print">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{content.title}</h2>
        <p className="text-muted-foreground">{content.subtitle}</p>
      </div>

      {/* Steps */}
      <div className="grid gap-4">
        {content.steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 bg-card rounded-xl border border-border"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-bitcoin-light flex items-center justify-center">
              <step.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
                {step.walletGuideLink && (
                  <>
                    {' '}
                    <a
                      href={step.walletGuideLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {language === 'pt' ? 'Confira aqui' : language === 'en' ? 'Check here' : 'Ver aquí'}
                    </a>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{content.faq.title}</h3>
        <Accordion type="single" collapsible className="w-full">
          {content.faq.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Resources */}
      <div className="bg-gradient-to-br from-bitcoin-light to-background rounded-xl border border-primary/20 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {content.resources.title}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {content.resources.items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-background/80 rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors flex items-center gap-1">
                  {item.title}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
