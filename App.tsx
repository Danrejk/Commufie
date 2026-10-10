import './global.css';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { CameraPermissionsGuard } from "@/components/FrontCamera/utils/CameraPermissionsGuard";
import { FrontCamera } from "@/components/FrontCamera/FrontCamera";

export default function App() {
  return (
    <View style={styles.container}>
      <GluestackUIProvider mode="light">
        <CameraPermissionsGuard>
          <FrontCamera
            onPhotoTaken={(uri: string) => {
              console.log('Photo captured at:', uri);
            }}
          />
        </CameraPermissionsGuard>
        <StatusBar style="light" />
      </GluestackUIProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
