import React, { useEffect } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface CameraPermissionsGuardProps {
  children: React.ReactNode;
}

export const CameraPermissionsGuard: React.FC<CameraPermissionsGuardProps> = ({ children }) => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    // ask for permission automatically if not yet granted
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  // permission denied
  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text className="text-white text-base mb-4 text-center">
          Camera permission is required.
        </Text>

        {permission.canAskAgain ? (
          <Button onPress={requestPermission}>
            <ButtonText>Allow Camera Access</ButtonText>
          </Button>
        ) : (
          <View style={styles.fallbackContainer}>
            <Text className="text-neutral-400 text-sm mb-4 text-center">
              Permission was denied. Please enable it in system settings.
            </Text>
            <Button variant="outline" onPress={() => Linking.openSettings()}>
              <ButtonText>Open Settings</ButtonText>
            </Button>
          </View>
        )}
      </View>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  fallbackContainer: {
    alignItems: 'center',
  },
});
