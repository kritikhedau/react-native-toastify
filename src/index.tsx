import {
  ToastProvider as BaseToastProvider,
  useToast,
} from './context/ToastContext';
import { ToastViewport } from './components/ToastViewport';
import type { ReactNode } from 'react';

type ToastProviderProps = {
  children: ReactNode;
  topOffset?: number;
  bottomOffset?: number;
};

export const ToastProvider = ({
  children,
  topOffset,
  bottomOffset,
}: ToastProviderProps) => {
  return (
    <BaseToastProvider>
      {children}
      <ToastViewport topOffset={topOffset} bottomOffset={bottomOffset} />
    </BaseToastProvider>
  );
};

export { useToast };
