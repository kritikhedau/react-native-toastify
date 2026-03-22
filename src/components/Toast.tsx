import { useToast } from '../context/ToastContext';
import type {
  Toast as ToastType,
  ToastType as ToastVariant,
} from '../types/Toast.types';
import { useCallback, useEffect, useRef } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface ToastProps {
  toast: ToastType;
  index: number;
  topOffset?: number;
  bottomOffset?: number;
}

const getBackgroundColor = (type: ToastVariant) => {
  switch (type) {
    case 'success':
      return '#10B981';
    case 'error':
      return '#EF4444';
    case 'warning':
      return '#F59E0B';
    case 'info':
      return '#3B82F6';
    default:
      return '#262626';
  }
};

const getIconForType = (type: ToastVariant) => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✗';
    case 'warning':
      return '⚠';
    case 'info':
      return 'ℹ';
    default:
      return '';
  }
};

const getStackOffset = (
  index: number,
  position: ToastType['options']['position']
) => {
  const baseOffset = 4;
  const maxOffset = 12;
  const offset = Math.min(index * baseOffset, maxOffset);
  return position === 'top' ? offset : -offset;
};

const getStackScale = (index: number) => {
  const scaleReduction = 0.02;
  const minScale = 0.92;
  return Math.max(1 - index * scaleReduction, minScale);
};

export const Toast = ({
  toast,
  index,
  topOffset,
  bottomOffset,
}: ToastProps) => {
  const prevIndexRef = useRef<number>(-1);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const { dismiss } = useToast();
  // Avoid deep type instantiation in TS during .d.ts generation.
  const AnimatedView: any = Animated.View;
  const opacity = useSharedValue(0);
  const position = toast.options.position;
  const duration = toast.options.duration;
  const onClose = toast.options.onClose;
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const scale = useSharedValue(0.9);
  const rotateZ = useSharedValue(0);

  const scheduleTimeout = (callback: () => void, delayMs: number) => {
    const timeoutId = setTimeout(callback, delayMs);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (prevIndexRef.current !== index && opacity.value > 0) {
      const soonerOffset = position === 'top' ? 2 : -2;
      const stackOffset = getStackOffset(index, position);
      const stackScale = getStackScale(index);

      translateY.value = withTiming(stackOffset + soonerOffset, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });

      scale.value = withTiming(stackScale * 0.98, {
        duration: 400,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });

      scheduleTimeout(() => {
        translateY.value = withSpring(stackOffset, {
          damping: 25,
          stiffness: 120,
          mass: 0.8,
          velocity: 0,
        });

        scale.value = withSpring(stackScale, {
          damping: 25,
          stiffness: 120,
          mass: 0.8,
          velocity: 0,
        });
      }, 200);
    }

    prevIndexRef.current = index;
  }, [index, position, translateY, scale, opacity]);

  const handleDismiss = useCallback(() => {
    dismiss(toast.id);
    onClose?.();
  }, [dismiss, onClose, toast.id]);

  useEffect(() => {
    const delay = index * 50;

    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });

    scheduleTimeout(() => {
      const stackOffset = getStackOffset(index, position);
      const stackScale = getStackScale(index);

      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });

      translateY.value = withSpring(stackOffset, {
        damping: 28,
        stiffness: 140,
        mass: 0.8,
        velocity: 0,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
      });

      scale.value = withSpring(stackScale, {
        damping: 28,
        stiffness: 140,
        mass: 0.8,
        velocity: 0,
      });

      rotateZ.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });
    }, delay);

    if (duration > 0) {
      const exitDelay = Math.max(0, duration - 500);

      const exitAnimations = () => {
        opacity.value = withTiming(0, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        });

        translateY.value = withTiming(position === 'top' ? -20 : 20, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        });

        scale.value = withTiming(0.95, {
          duration: 400,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        });

        scheduleTimeout(() => {
          runOnJS(handleDismiss)();
        }, 400);
      };

      scheduleTimeout(exitAnimations, exitDelay);
    }
  }, [
    handleDismiss,
    index,
    opacity,
    rotateZ,
    scale,
    duration,
    position,
    translateY,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
      zIndex: 1000 - index,
    };
  });

  const backgroundColor = getBackgroundColor(toast.options.type);
  const icon = getIconForType(toast.options.type);
  const resolvedBackgroundColor =
    toast.options.backgroundColor ?? backgroundColor;
  const resolvedBorderRadius = toast.options.borderRadius ?? 12;
  const textStyleOverrides = {
    fontSize: toast.options.fontSize ?? undefined,
    fontFamily: toast.options.fontFamily ?? undefined,
  };

  const containerStyle: any = [
    styles.toastContainer,
    animatedStyle,
    {
      position: 'absolute',
      marginTop: 0,
      marginBottom: 0,
      top: position === 'top' ? topOffset ?? 100 : undefined,
      bottom: position === 'bottom' ? bottomOffset ?? 0 : undefined,
      borderRadius: resolvedBorderRadius,
    },
  ];

  const handlePress = () => {
    opacity.value = withTiming(0, {
      duration: 250,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    translateY.value = withTiming(position === 'top' ? -100 : 100, {
      duration: 250,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    scale.value = withTiming(0.8, {
      duration: 250,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    scheduleTimeout(() => {
      handleDismiss();
    }, 250);
  };

  return (
    <AnimatedView style={containerStyle}>
      <Pressable
        style={[
          styles.toast,
          {
            backgroundColor: resolvedBackgroundColor,
            borderRadius: resolvedBorderRadius,
          },
        ]}
        onPress={handlePress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
      >
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <View style={styles.contentContainer}>
          {typeof toast.content === 'string' ? (
            <Text style={[styles.text, textStyleOverrides]}>
              {toast.content}
            </Text>
          ) : (
            toast.content
          )}
        </View>
        {toast.options.action && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              toast?.options?.action?.onPress!();
              handlePress();
            }}
          >
            <Text style={[styles.actionText, textStyleOverrides]}>
              {toast.options.action.label}
            </Text>
          </TouchableOpacity>
        )}
      </Pressable>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    marginVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  icon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 24,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
