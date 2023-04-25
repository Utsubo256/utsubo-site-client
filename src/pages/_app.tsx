import { ChakraProvider, extendTheme } from '@chakra-ui/react';

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
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
