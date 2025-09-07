import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Simple test app to check if basic React Native works
export default function TestApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StyleDNA Test App</Text>
      <Text style={styles.subtext}>If you can see this, React Native is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
});