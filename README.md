# React Native Toastify

A beautiful, customizable toast notification library for React Native with smooth animations, dark mode support, and extensive customization options.

![npm version](https://img.shields.io/npm/v/%40kritikhedau/react-native-toastify)
![license](https://img.shields.io/npm/l/%40kritikhedau/react-native-toastify)

![Toast Demo](./demos/Simulator%20Screen%20Recording%20-%20iPhone%2017%20Pro%20-%202026-03-22%20at%2013.27.30.gif)

## Features

- 🎨 **5 Toast Types** - Default, Success, Error, Warning, Info
- 🌙 **Dark & Light Mode** - Automatic theme detection
- 📍 **Position Control** - Top or bottom placement
- ⏱️ **Custom Duration** - From 1 second to persistent
- 🎯 **Action Buttons** - Add interactive buttons to toasts
- 🔄 **Callbacks** - Execute code when toast closes
- 🧩 **Custom Content** - Render any React component
- 🎬 **Smooth Animations** - Spring physics with reanimated
- 📱 **TypeScript** - Full type support
- ⚡ **Zero Dependencies** - Except react-native-reanimated

## Installation

```bash
npm install @kritikhedau/react-native-toastify
# or
yarn add @kritikhedau/react-native-toastify
```

**Note:** This library requires `react-native-reanimated`. If not already installed:

```bash
npm install react-native-reanimated
# or
yarn add react-native-reanimated
```

## Quick Start

### 1. Wrap Your App with ToastProvider

```tsx
import { ToastProvider } from '@kritikhedau/react-native-toastify';

export default function App() {
  return <ToastProvider>{/* Your app content */}</ToastProvider>;
}
```

### 2. Use Toasts in Your Components

```tsx
import { useToast } from '@kritikhedau/react-native-toastify';

function MyComponent() {
  const { show } = useToast();

  return (
    <Button
      title="Show Toast"
      onPress={() => show('Hello World!', { type: 'success' })}
    />
  );
}
```

## Usage Examples

### Basic Toasts

```tsx
const { show } = useToast();

// Simple message
show('Operation completed');

// Success toast
show('Saved successfully!', { type: 'success' });

// Error toast
show('Something went wrong', { type: 'error' });

// Warning toast
show('Please check your input', { type: 'warning' });

// Info toast
show('New update available', { type: 'info' });
```

### Position Control

```tsx
// Show at top (default)
show('Top toast', { position: 'top' });

// Show at bottom
show('Bottom toast', { position: 'bottom' });
```

### Duration Control

```tsx
// Quick toast (1 second)
show('Quick!', { duration: 1000 });

// Normal duration (3 seconds - default)
show('Standard', { duration: 3000 });

// Long duration (8 seconds)
show('Long toast', { duration: 8000 });

// Persistent (manual dismiss only)
show('Tap to dismiss', { duration: 0 });
```

### Action Buttons

```tsx
show('Item deleted', {
  type: 'default',
  action: {
    label: 'Undo',
    onPress: () => {
      show('Restored!', { type: 'success' });
    },
  },
});
```

### Callbacks

```tsx
show('Processing...', {
  type: 'info',
  onClose: () => {
    console.log('Toast closed!');
    // Execute any code when toast dismisses
  },
});
```

### Custom Content

```tsx
import { View, Text } from 'react-native';

const customContent = (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={{ fontSize: 24 }}>🎉</Text>
    <Text style={{ marginLeft: 8, color: '#fff' }}>Custom Component!</Text>
  </View>
);

show(customContent, {
  type: 'success',
  duration: 5000,
});
```

### Combined Example

```tsx
show('Upload complete!', {
  type: 'success',
  position: 'bottom',
  duration: 5000,
  action: {
    label: 'View',
    onPress: () => navigation.navigate('Uploads'),
  },
  onClose: () => console.log('Toast dismissed'),
});
```

## Programmatic Control

```tsx
const { show, dismiss, dismissAll, update } = useToast();

// Show and get toast ID
const toastId = show('Loading...', { duration: 0 });

// Dismiss specific toast
dismiss(toastId);

// Dismiss all toasts
dismissAll();

// Update existing toast
update(toastId, 'Complete!', { type: 'success', duration: 2000 });
```

## API Reference

### ToastProvider

Wraps your application to provide toast functionality.

```tsx
<ToastProvider>
  <YourApp />
</ToastProvider>
```

Optional offsets for fine-tuning the toast position:

```tsx
<ToastProvider topOffset={120} bottomOffset={80}>
  <YourApp />
</ToastProvider>
```

| Prop           | Type     | Default           | Description                    |
| -------------- | -------- | ----------------- | ------------------------------ |
| `topOffset`    | `number` | `height * 0.1072` | Distance from top of the screen |
| `bottomOffset` | `number` | `height * 0.1072` | Distance from bottom of the screen |

### useToast Hook

Returns an object with toast control methods:

| Method       | Type                              | Description                       |
| ------------ | --------------------------------- | --------------------------------- |
| `show`       | `(content, options?) => string`   | Display a toast, returns toast ID |
| `dismiss`    | `(id: string) => void`            | Dismiss a specific toast          |
| `dismissAll` | `() => void`                      | Dismiss all active toasts         |
| `update`     | `(id, content, options?) => void` | Update an existing toast          |

### ToastOptions

| Property          | Type                                                       | Default     | Description                     |
| ----------------- | ---------------------------------------------------------- | ----------- | ------------------------------- |
| `type`            | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Toast visual style              |
| `position`        | `'top' \| 'bottom'`                                        | `'top'`     | Screen position                 |
| `duration`        | `number`                                                   | `3000`      | Duration in ms (0 = persistent) |
| `onClose`         | `() => void`                                               | `undefined` | Callback when toast closes      |
| `backgroundColor` | `string`                                                   | `undefined` | Override background color       |
| `borderRadius`    | `number`                                                   | `12`        | Override toast border radius    |
| `fontSize`        | `number`                                                   | `16`        | Override toast text font size   |
| `fontFamily`      | `string`                                                   | `undefined` | Override toast text font family |
| `action`          | `{ label: string, onPress: () => void } \| null`           | `null`      | Action button                   |

## Theming

The library automatically detects system dark/light mode. Toast colors adapt accordingly:

### Light Mode Colors

- **Success**: `#10B981` (Emerald)
- **Error**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Amber)
- **Info**: `#3B82F6` (Blue)
- **Default**: `#64748B` (Slate)

### Dark Mode Colors

- **Success**: `#34D399` (Emerald)
- **Error**: `#F87171` (Red)
- **Warning**: `#FBBF24` (Amber)
- **Info**: `#60A5FA` (Blue)
- **Default**: `#94A3B8` (Slate)

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  ToastOptions,
  ToastType,
  ToastPosition,
} from '@kritikhedau/react-native-toastify';

const options: ToastOptions = {
  type: 'success',
  position: 'top',
  duration: 3000,
};
```

## Example App

Check the `/example` folder for a complete demo app showcasing all features with modern dark/light theming.

```bash
cd example
npm install
npx expo start
```

## Requirements

- React Native >= 0.70.0
- react-native-reanimated >= 3.0.0

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Kriti Khedau](https://github.com/kritikhedau)

---

Made with ❤️ for the React Native community
