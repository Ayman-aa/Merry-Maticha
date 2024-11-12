import React, { useEffect, useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from './LoadingScreen';

interface LoadingWrapperProps {
  children: ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showLoading ? <LoadingScreen /> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingWrapper;