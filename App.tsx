import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FrontCamera } from './components/FrontCamera/FrontCamera';

export default function App() {
  return (
    <View style={styles.container}>
      <FrontCamera
        onPhotoTaken={(uri: string) => {
          console.log('Photo captured at:', uri);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
