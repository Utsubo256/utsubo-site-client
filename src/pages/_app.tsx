import { ChakraProvider } from '@chakra-ui/react';

import Layout from '@/components/Layout/Layout';
import { AuthContextProvider } from '@/context/AuthContext';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
