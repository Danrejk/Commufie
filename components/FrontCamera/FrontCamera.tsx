import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView } from 'expo-camera';
import { Button, ButtonText } from '@/components/ui/button';

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
      <CameraView
        ref={cameraRef}
        facing="front"
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.shutterContainer}>
        <Button size="lg" onPress={handleCapture}>
          <ButtonText className="font-bold">Take Photo</ButtonText>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shutterContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
