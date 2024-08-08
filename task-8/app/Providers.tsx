'use client';

import { Provider } from 'react-redux';
import { store } from './redux/store'; // Adjust the path to your store

export default function StoreProviderWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
