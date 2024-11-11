import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect, Defs, ClipPath } from 'react-native-svg';

interface WaterMeterProps {
  progress: number;
  size: number;
}

const WaterMeter: React.FC<WaterMeterProps> = ({ progress, size }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const radius = (size / 2) - 15; // Adjusted radius to fit within the viewBox
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [size, 0], // Adjusted to ensure it animates from bottom to top
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <ClipPath id="clip">
            <Circle cx={size / 2} cy={size / 2} r={radius} />
          </ClipPath>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F7936F"
          strokeWidth="5"
          fill="none"
        />
        <AnimatedRect
          x="0"
          y={translateY}
          width={size}
          height={size}
          fill="#F7936F"
          clipPath="url(#clip)"
        />
      </Svg>
    </View>
  );
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WaterMeter;