import * as React from 'react';

import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
