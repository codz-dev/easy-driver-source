import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet, Image, Dimensions} from "react-native";
import { Camera } from "expo-camera";
import StepIndicator from "react-native-step-indicator";
import { useNavigation, useRoute } from "@react-navigation/native";

const documents = [
  { name: "Document 1", instruction: "Take a photo of your ID" },
  { name: "Document 2", instruction: "Take a photo of your passport" },
  { name: "Document 3", instruction: "Take a photo of your utility bill" },
];

export default function DocumentPhoto() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();
  const selfie = route.params.picture;

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, { uri: photo.uri, document: documents[step] }]);
      if (step < documents.length - 1) {
        setStep(step + 1);
      } else {
        setShowCamera(false);
      }
    }
  };

  const handleRestart = () => {
    setPhotos([]);
    setStep(0);
    setShowCamera(true);
  };

  const handleNext = () => {
    navigation.navigate('Step4', { photos }); // Passer les photos à Step4
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <Text style={styles.instructionText}>
              {documents[step].instruction}
            </Text>
            <Button title="Take Photo" onPress={handleTakePhoto} />
            <View style={styles.steps}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={step}
                style={{
                  width: 300,
                  marginBottom: 20
                }}
                stepCount={documents.length}
                labels={documents.map((doc) => doc.name)}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <>
          <Text style={styles.introText}>Vous devez prendre une photo des documents suivants:</Text>
          <Button title="Commencer" onPress={() => setShowCamera(true)} />
          {photos.length > 0 && (
            <View style={styles.photosContainer}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Text>{photo.document.name}</Text>
                  <Image source={{ uri: photo.uri }} style={styles.photo} />
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <Button title="Recommencer" onPress={handleRestart} />
                <Button title="Suivant" onPress={handleNext} />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    width: width,
  },
  steps: {
    width: width,
  },
  instructionText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 16,
  },
  introText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  photosContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  photoWrapper: {
    marginBottom: 10,
    alignItems: "center",
  },
  photo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
