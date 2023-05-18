import { useEffect } from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as gtag from 'src/lib/gtag';

import Layout from '@/components/Layout/Layout';
import { AuthContextProvider } from '@/context/AuthContext';

import type { AppProps } from 'next/app';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.100',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouterChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
          `,
        }}
        id="gtag-init"
        strategy="afterInteractive"
      />
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </ChakraProvider>
    </>
  );
}
