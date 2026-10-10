import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export const CameraPermissionsGuard = ({ children }: { children: React.ReactNode }) => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    // ask for permission automatically if not yet granted
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (permission.granted) {
    return <>{children}</>;
  }

  // permission denied
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera access is required.</Text>

      {permission.canAskAgain ? (
        <Button title="Allow Camera Access" onPress={requestPermission} />
      ) : (
        <>
          <Text style={styles.subtext}>
            Permission was denied - enable it in system settings
          </Text>
          <Button title="Open Settings" onPress={() => Linking.openSettings()} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});
