import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
export * from './dashboard';
export * from './block';
export * from './transaction';
export * from './validator';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export type CoinTypes = {
  icon: JSX.Element;
  code: string;
  name: string;
  price: number;
};

export interface Attachment {
  id: string;
  original: string;
  thumbnail: string;
}
