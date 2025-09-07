// Backup of original App.tsx
import React, { useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { darkTheme } from './src/theme';
import { useDataService } from './src/hooks/useDataService';

// Optimized Loading component for PersistGate
const LoadingScreen: React.FC = React.memo(() => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>StyleDNA™</Text>
    <Text style={styles.loadingSubtext}>Initializing your genome...</Text>
  </View>
));

// Optimized App content component with performance monitoring
const AppContent: React.FC = React.memo(() => {
  const { isReady, error } = useDataService();

  // Memoize error screen to prevent unnecessary re-renders
  const errorScreen = useMemo(() => {
    if (!error) return null;
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>StyleDNA™</Text>
        <Text style={styles.errorText}>Failed to initialize: {error}</Text>
      </View>
    );
  }, [error]);

  // Memoize loading screen to prevent unnecessary re-renders
  const loadingScreen = useMemo(() => {
    if (isReady) return null;
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>StyleDNA™</Text>
        <Text style={styles.loadingSubtext}>Loading fashion intelligence...</Text>
      </View>
    );
  }, [isReady]);

  if (error) return errorScreen;
  if (!isReady) return loadingScreen;

  return <AppNavigator />;
});

export default function App() {
  // Performance monitoring
  useEffect(() => {
    console.log('StyleDNA App initialized');
    
    // Monitor memory usage on Android
    if (__DEV__) {
      const memoryInterval = setInterval(() => {
        if (global.performance && (global.performance as any).memory) {
          const memory = (global.performance as any).memory;
          console.log('Memory usage:', {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
          });
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(memoryInterval);
    }
    
    return undefined;
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <StatusBar style="light" backgroundColor={darkTheme.colors.surface} />
          <AppContent />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: darkTheme.spacing.lg,
  },
  loadingText: {
    ...darkTheme.typography.displayMedium,
    color: darkTheme.colors.primary,
    textAlign: 'center',
    marginBottom: darkTheme.spacing.sm,
  },
  loadingSubtext: {
    ...darkTheme.typography.bodyMedium,
    color: darkTheme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  errorText: {
    ...darkTheme.typography.bodyMedium,
    color: darkTheme.colors.error,
    textAlign: 'center',
    marginTop: darkTheme.spacing.md,
  },
});