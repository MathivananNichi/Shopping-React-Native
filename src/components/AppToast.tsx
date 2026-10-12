import React, { useState, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

type ToastListener = (message: string, duration?: number) => void;
let showToastListener: ToastListener | null = null;

export const AppToast = {
  show: (message: string, duration: number = 2500) => {
    if (showToastListener) {
      showToastListener(message, duration);
    }
  },
};

export const AppToastContainer = () => {
  const [message, setMessage] = useState<string | null>(null);
  const animValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    showToastListener = (msg, duration = 2500) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setMessage(msg);
      animValue.setValue(0);

      // Smooth Fade In with ease-out
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        // Wait and Smooth Fade Out with ease-in
        timerRef.current = setTimeout(() => {
          Animated.timing(animValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }).start(() => setMessage(null));
        }, duration);
      });
    };

    return () => {
      showToastListener = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animValue]);

  if (!message) return null;

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <Animated.View
        style={[
          styles.toastContainer,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 60,
    zIndex: 9999,
  },
  toastContainer: {
    backgroundColor: "rgba(35, 35, 35, 1)",
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 25,
    maxWidth: "85%",
    elevation: 0,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  toastText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 18,
  },
});
