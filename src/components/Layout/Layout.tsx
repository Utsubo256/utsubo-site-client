import * as React from 'react';

import { Box } from '@chakra-ui/react';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box boxSizing="border-box" minH="100vh" pb="61px" position="relative">
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
}
