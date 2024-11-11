import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, StatusBar, StyleSheet, Text } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import WaterMeter from './WaterMeter'; // Ensure this path is correct

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const PomodoroTimer = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(1500); // Example: 25 minutes
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
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setIsWorking(!isWorking);
            return isWorking ? 300 : 1500; // Example: 5 min break, 25 min work
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isWorking]);

  useEffect(() => {
    setProgress((1500 - time) / 1500); // Update progress based on time
  }, [time]);

  const startTimer = () => {
    setIsRunning(true);
    setShowRestButton(true); // Show the 'Rest' button when the 'Start' button is clicked
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(1500); // Reset to initial time (25 minutes)
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