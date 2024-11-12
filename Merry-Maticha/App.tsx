import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PomodoroTimer from './src/components/pomodoroTimer';
import LoadingWrapper from './src/components/LoadingWrapper';

export default function App() {
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