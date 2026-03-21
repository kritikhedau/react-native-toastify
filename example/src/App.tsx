import { ToastProvider } from '@kritikhedau/react-native-toastify';

import Example from './Example';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <Example />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
