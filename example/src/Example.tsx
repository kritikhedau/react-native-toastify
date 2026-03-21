import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useToast } from '@kritikhedau/react-native-toastify';
import { SafeAreaView } from 'react-native-safe-area-context';

// Modern Color Theme
const Colors = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    default: '#64748B',
    card: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    info: '#60A5FA',
    default: '#94A3B8',
    card: '#1E293B',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

const Example = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme !== 'dark' ? Colors.light : Colors.dark;
  const styles = makeStyles(theme);

  const { show, dismiss, dismissAll } = useToast();

  // =====================================================
  // BASIC TOAST EXAMPLES
  // =====================================================

  const showDefaultToast = () => {
    show('This is a default toast message');
  };

  const showSuccessToast = () => {
    show('Operation completed successfully!', {
      type: 'success',
    });
  };

  const showErrorToast = () => {
    show('Something went wrong. Please try again.', {
      type: 'error',
    });
  };

  const showWarningToast = () => {
    show('Please check your input before proceeding.', {
      type: 'warning',
    });
  };

  const showInfoToast = () => {
    show('New update available for download.', {
      type: 'info',
    });
  };

  // =====================================================
  // POSITION EXAMPLES
  // =====================================================

  const showTopToast = () => {
    show('Toast at the top!', {
      type: 'info',
      position: 'top',
    });
  };

  const showBottomToast = () => {
    show('Toast at the bottom!', {
      type: 'success',
      position: 'bottom',
    });
  };

  // =====================================================
  // DURATION EXAMPLES
  // =====================================================

  const showQuickToast = () => {
    show('Quick 1 second toast!', {
      type: 'info',
      duration: 1000,
    });
  };

  const showNormalToast = () => {
    show('Standard 3 second toast (default)', {
      type: 'info',
      duration: 3000,
    });
  };

  const showLongToast = () => {
    show('This toast stays for 8 seconds', {
      type: 'warning',
      duration: 8000,
    });
  };

  const showPersistentToast = () => {
    const id = show('Tap to dismiss me!', {
      type: 'info',
      duration: 0,
    });
    console.log('Toast ID:', id);
  };

  // =====================================================
  // ACTION BUTTON EXAMPLES
  // =====================================================

  const showToastWithAction = () => {
    show('Item deleted', {
      type: 'default',
      action: {
        label: 'Undo',
        onPress: () => {
          show('Item restored!', {
            type: 'success',
            duration: 2000,
          });
        },
      },
    });
  };

  const showToastWithRetryAction = () => {
    show('Failed to upload image', {
      type: 'error',
      duration: 5000,
      action: {
        label: 'Retry',
        onPress: () => {
          show('Retrying upload...', {
            type: 'info',
            duration: 2000,
          });
        },
      },
    });
  };

  // =====================================================
  // CALLBACK EXAMPLES
  // =====================================================

  const showToastWithCallback = () => {
    show('Watch the console when I close!', {
      type: 'info',
      onClose: () => {
        console.log('Toast was dismissed!');
        show('Callback executed!', {
          type: 'success',
          duration: 1500,
        });
      },
    });
  };

  // =====================================================
  // CUSTOM CONTENT EXAMPLES
  // =====================================================

  const showCustomContentToast = () => {
    const customContent = (
      <View style={styles.customContent}>
        <Text style={styles.customTitle}>Custom Component</Text>
        <Text style={styles.customSubtitle}>
          You can render any React component here!
        </Text>
      </View>
    );
    show(customContent, {
      type: 'success',
      duration: 4000,
    });
  };

  const showRichContentToast = () => {
    const richContent = (
      <View style={styles.richContent}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🎉</Text>
        </View>
        <View style={styles.richTextContainer}>
          <Text style={styles.richTitle}>Congratulations!</Text>
          <Text style={styles.richSubtitle}>You've completed all tasks</Text>
        </View>
      </View>
    );
    show(richContent, {
      type: 'default',
      duration: 5000,
    });
  };

  // =====================================================
  // PROGRAMMATIC CONTROL EXAMPLES
  // =====================================================

  const [lastToastId, setLastToastId] = React.useState<string | null>(null);

  const showDismissibleToast = () => {
    const id = show('I can be dismissed programmatically!', {
      type: 'info',
      duration: 0,
    });
    setLastToastId(id);
  };

  const dismissLastToast = () => {
    if (lastToastId) {
      dismiss(lastToastId);
      setLastToastId(null);
    }
  };

  const dismissAllToasts = () => {
    dismissAll();
    show('All toasts dismissed!', {
      type: 'success',
      duration: 1500,
    });
  };

  // =====================================================
  // COMBINED EXAMPLES
  // =====================================================

  const showComboExample = () => {
    show('Success with action button and callback!', {
      type: 'success',
      position: 'bottom',
      duration: 5000,
      action: {
        label: 'View',
        onPress: () => {
          show('Navigating...', {
            type: 'info',
            duration: 1000,
          });
        },
      },
      onClose: () => {
        console.log('Combo toast closed');
      },
    });
  };

  const showSequentialToasts = () => {
    show('First toast', { type: 'info' });
    setTimeout(() => {
      show('Second toast', { type: 'success' });
    }, 600);
    setTimeout(() => {
      show('Third toast', { type: 'warning' });
    }, 1200);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Native Toastify</Text>
          <Text style={styles.headerSubtitle}>
            Comprehensive Demo & Examples
          </Text>
        </View>

        {/* Basic Types Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Toast Types</Text>
          <View style={styles.buttonGrid}>
            <ActionButton
              onPress={showDefaultToast}
              label="Default"
              color={theme.default}
              theme={theme}
            />
            <ActionButton
              onPress={showSuccessToast}
              label="Success"
              color={theme.success}
              theme={theme}
            />
            <ActionButton
              onPress={showErrorToast}
              label="Error"
              color={theme.error}
              theme={theme}
            />
            <ActionButton
              onPress={showWarningToast}
              label="Warning"
              color={theme.warning}
              theme={theme}
            />
            <ActionButton
              onPress={showInfoToast}
              label="Info"
              color={theme.info}
              theme={theme}
            />
          </View>
        </View>

        {/* Position Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Position Control</Text>
          <View style={styles.buttonRow}>
            <ActionButton
              onPress={showTopToast}
              label="Top Position"
              color={theme.info}
              theme={theme}
            />
            <ActionButton
              onPress={showBottomToast}
              label="Bottom Position"
              color={theme.success}
              theme={theme}
            />
          </View>
        </View>

        {/* Duration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration Control</Text>
          <View style={styles.buttonGrid}>
            <ActionButton
              onPress={showQuickToast}
              label="1 Second"
              color={theme.info}
              theme={theme}
            />
            <ActionButton
              onPress={showNormalToast}
              label="3 Seconds"
              color={theme.default}
              theme={theme}
            />
            <ActionButton
              onPress={showLongToast}
              label="8 Seconds"
              color={theme.warning}
              theme={theme}
            />
            <ActionButton
              onPress={showPersistentToast}
              label="Persistent"
              color={theme.error}
              theme={theme}
            />
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Action Buttons</Text>
          <View style={styles.buttonColumn}>
            <WideButton
              onPress={showToastWithAction}
              label="Undo Action"
              description="Shows undo button"
              theme={theme}
            />
            <WideButton
              onPress={showToastWithRetryAction}
              label="Retry Action"
              description="Shows retry button"
              theme={theme}
            />
          </View>
        </View>

        {/* Callbacks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Callbacks</Text>
          <WideButton
            onPress={showToastWithCallback}
            label="onClose Callback"
            description="Triggers when toast closes"
            theme={theme}
          />
        </View>

        {/* Custom Content Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Content</Text>
          <View style={styles.buttonRow}>
            <ActionButton
              onPress={showCustomContentToast}
              label="Custom Component"
              color={theme.success}
              theme={theme}
            />
            <ActionButton
              onPress={showRichContentToast}
              label="Rich Content"
              color={theme.info}
              theme={theme}
            />
          </View>
        </View>

        {/* Programmatic Control Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Programmatic Control</Text>
          <View style={styles.buttonColumn}>
            <WideButton
              onPress={showDismissibleToast}
              label="Show Dismissible"
              description="Tap to dismiss this"
              theme={theme}
            />
            {lastToastId && (
              <WideButton
                onPress={dismissLastToast}
                label="Dismiss Last"
                description="Programmatically dismiss"
                theme={theme}
                accent={theme.error}
              />
            )}
            <WideButton
              onPress={dismissAllToasts}
              label="Dismiss All"
              description="Clear all toasts"
              theme={theme}
              accent={theme.error}
            />
          </View>
        </View>

        {/* Combined Examples Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Combined Examples</Text>
          <View style={styles.buttonColumn}>
            <WideButton
              onPress={showComboExample}
              label="Full Combo"
              description="Type + Position + Duration + Action + Callback"
              theme={theme}
            />
            <WideButton
              onPress={showSequentialToasts}
              label="Sequential Toasts"
              description="Multiple toasts in sequence"
              theme={theme}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Current Theme: {colorScheme || 'default'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// =====================================================
// SUB-COMPONENTS
// =====================================================

interface ActionButtonProps {
  onPress: () => void;
  label: string;
  color: string;
  theme: typeof Colors.light;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  label,
  color,
  theme,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.actionButton, { borderColor: color } as ViewStyle]}
    activeOpacity={0.7}
  >
    <View style={[styles.buttonDot, { backgroundColor: color } as ViewStyle]} />
    <Text style={[styles.buttonLabel, { color: theme.text } as TextStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface WideButtonProps {
  onPress: () => void;
  label: string;
  description: string;
  theme: typeof Colors.light;
  accent?: string;
}

const WideButton: React.FC<WideButtonProps> = ({
  onPress,
  label,
  description,
  theme,
  accent,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.wideButton,
      { borderColor: accent || theme.border } as ViewStyle,
    ]}
    activeOpacity={0.7}
  >
    <View style={styles.wideButtonContent}>
      <Text
        style={[
          styles.wideButtonLabel,
          { color: accent || theme.text } as TextStyle,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.wideButtonDescription,
          { color: theme.textSecondary } as TextStyle,
        ]}
      >
        {description}
      </Text>
    </View>
  </TouchableOpacity>
);

// =====================================================
// STYLES
// =====================================================

const makeStyles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
    },
    header: {
      marginBottom: 24,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 12,
    },
    buttonGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
    },
    buttonColumn: {
      gap: 8,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: theme.surface,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    buttonLabel: {
      fontSize: 14,
      fontWeight: '500',
    },
    wideButton: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1.5,
      backgroundColor: theme.surface,
    },
    wideButtonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wideButtonLabel: {
      fontSize: 15,
      fontWeight: '600',
    },
    wideButtonDescription: {
      fontSize: 13,
    },
    customContent: {
      paddingVertical: 4,
    },
    customTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    customSubtitle: {
      fontSize: 14,
      color: '#E2E8F0',
    },
    richContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    iconText: {
      fontSize: 24,
    },
    richTextContainer: {
      flex: 1,
    },
    richTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 2,
    },
    richSubtitle: {
      fontSize: 14,
      color: '#E2E8F0',
    },
    footer: {
      marginTop: 20,
      alignItems: 'center',
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    footerText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
  });

const styles = StyleSheet.create({
  actionButton: {},
  buttonDot: {},
  buttonLabel: {},
  wideButton: {},
  wideButtonContent: {},
  wideButtonLabel: {},
  wideButtonDescription: {},
});

export default Example;
