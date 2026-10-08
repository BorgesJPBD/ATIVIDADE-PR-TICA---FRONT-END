import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import { FrotaProvider } from '@/context/FrotaContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Checklist de Frota',
  description: 'Checklist diário de revisão veicular antes da saída do pátio.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1b3f95',
};

const scriptTema = `(function(){try{var t=localStorage.getItem('tema');if(t!=='claro'&&t!=='escuro'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'escuro':'claro'}document.documentElement.dataset.tema=t}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>
        <FrotaProvider>
          <Header />
          <main className="container pagina">{children}</main>
        </FrotaProvider>
      </body>
    </html>
  );
}
