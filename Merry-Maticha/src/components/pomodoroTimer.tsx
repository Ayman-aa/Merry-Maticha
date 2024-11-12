import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, StatusBar, StyleSheet, Text } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import WaterMeter from './WaterMeter'; // Ensure this path is correct

const POMODORO_DURATION = 3; // 25 minutes in seconds
const BREAK_DURATION = 6; // 5 minutes in seconds

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const PomodoroTimer = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(POMODORO_DURATION);
  const [progress, setProgress] = useState(0);
  const [showRestButton, setShowRestButton] = useState(false); // State to manage the visibility of the 'Rest' button

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            setIsWorking(!isWorking);
            setProgress(0); // Reset progress when switching between work and break
            return isWorking ? BREAK_DURATION : POMODORO_DURATION;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isWorking]);

  useEffect(() => {
    if (isWorking) {
      setProgress((POMODORO_DURATION - time) / POMODORO_DURATION); // Update progress based on work time
    } else {
      setProgress((BREAK_DURATION - time) / BREAK_DURATION); // Update progress based on break time
    }
  }, [time, isWorking]);

  const startTimer = () => {
    setIsRunning(true);
    setShowRestButton(true); // Show the 'Rest' button when the 'Start' button is clicked
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorking(true); // Reset to 'Work Time'
    setTime(POMODORO_DURATION); // Reset to initial time (25 minutes)
    setProgress(0);
    setShowRestButton(false); // Hide the 'Rest' button after resetting
  };

  if (!fontsLoaded) {
    return null; // Render nothing while fonts are loading
  } else {
    // Hide the splash screen once fonts are loaded
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.textTitle}>{isWorking ? 'Work Time' : 'Break Time'}</Text>
        <View style={styles.meterContainer}>
          <WaterMeter progress={progress} size={310} />
          <Svg height="100" width="200" style={styles.svgText}>
            <SvgText
              fill="none"
              stroke="black"
              fontSize="60"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              fontWeight="bold"
              fontFamily="Poppins_700Bold" // Use your bold custom font here
              x="50%"
              y="50%"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}
            </SvgText>
          </Svg>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={isRunning ? stopTimer : startTimer}
            style={[styles.button, { backgroundColor: isRunning ? '#FF3B30' : '#F7936F' }]}
          >
            <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
        </View>
        {showRestButton && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={resetTimer}
              style={[styles.button, { backgroundColor: 'black' }]}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: 'Poppins_700Bold', 
  },
  meterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svgText: {
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PomodoroTimer;