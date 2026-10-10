import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { CameraPermissionsGuard } from "./utils/CameraPermissionsGuard";

interface FrontCameraProps {
  onPhotoTaken?: (uri: string) => void;
}

export const FrontCamera: React.FC<FrontCameraProps> = ({ onPhotoTaken }) => {
  const cameraRef = useRef<CameraView>(null);


  const handleCapture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri && onPhotoTaken) {
      onPhotoTaken(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraPermissionsGuard>
        <CameraView ref={cameraRef} facing="front" style={styles.camera} />
        <Button title="Take Photo" onPress={handleCapture} />
      </CameraPermissionsGuard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
