import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import PomodoroTimer from './src/components/pomodoroTimer';
import LoadingWrapper from './src/components/LoadingWrapper';

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Perform any necessary loading tasks here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a loading task
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync(); // Hide the splash screen once the app is ready
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null; // Render nothing while the app is loading
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingWrapper>
        <PomodoroTimer />
      </LoadingWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEF4F1',
  },
});