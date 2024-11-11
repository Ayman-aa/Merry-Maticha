import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PomodoroTimer from './src/components/pomodoroTimer';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PomodoroTimer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEF4F1',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});