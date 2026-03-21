import { useToast } from '../context/ToastContext';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from './Toast';

type ToastViewportProps = {
  topOffset?: number;
  bottomOffset?: number;
};

export const ToastViewport = ({
  topOffset,
  bottomOffset,
}: ToastViewportProps) => {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const defaultOffset = Math.round(windowHeight * 0.1072);
  const resolvedTopOffset = topOffset ?? defaultOffset;
  const resolvedBottomOffset = bottomOffset ?? defaultOffset;
  const topInsetStyle = { paddingTop: insets.top + 10 };
  const bottomInsetStyle = { marginBottom: insets.bottom };

  const topToasts = toasts.filter((toast) => toast.options.position === 'top');
  const bottomToasts = toasts.filter(
    (toast) => toast.options.position === 'bottom'
  );

  return (
    <>
      <View
        style={[
          styles.viewport,
          styles.topViewport,
          styles.viewportHeight,
          topInsetStyle,
        ]}
      >
        {topToasts.map((toast, arrayIndex) => {
          const displayIndex = topToasts.length - 1 - arrayIndex;
          return (
            <Toast
              key={toast.id}
              toast={toast}
              index={displayIndex}
              topOffset={resolvedTopOffset}
              bottomOffset={resolvedBottomOffset}
            />
          );
        })}
      </View>
      <View
        style={[
          styles.viewport,
          styles.bottomViewport,
          styles.viewportHeight,
          bottomInsetStyle,
        ]}
      >
        {bottomToasts.map((toast, arrayIndex) => {
          const displayIndex = bottomToasts.length - 1 - arrayIndex;
          return (
            <Toast
              key={toast.id}
              toast={toast}
              index={displayIndex}
              topOffset={resolvedTopOffset}
              bottomOffset={resolvedBottomOffset}
            />
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 16,
    pointerEvents: 'box-none',
  },
  topViewport: {
    top: 0,
    justifyContent: 'flex-start',
  },
  bottomViewport: {
    bottom: 0,
    justifyContent: 'flex-end',
  },
  viewportHeight: {
    height: 200,
  },
});
