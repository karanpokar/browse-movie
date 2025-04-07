// components/GlassCard.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

type BlurType = 'dark' | 'light' | 'extraDark' | 'regular' | 'prominent';

interface GlassProps {
  children: React.ReactNode;
  style: {};
  blurType: BlurType;
  blurAmount: number;
}

const GlassCard = ({
  children,
  style = {},
  blurType = 'light',
  blurAmount = 20,
}: GlassProps) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={blurType}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.inner}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  inner: {
    padding: 16,
  },
});

export default GlassCard;
