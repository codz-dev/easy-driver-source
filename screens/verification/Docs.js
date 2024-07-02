import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions} from "react-native";
import { Camera } from "expo-camera";
import StepIndicator from "react-native-step-indicator";
import { useNavigation, useRoute } from "@react-navigation/native";
import  Button  from '../../components/Button';
import LottieView from "lottie-react-native";
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

  const [started, setStarted] = useState(false);
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
    navigation.navigate('Car', { photos }); // Passer les photos à Step4
  };

  return (
    <View style={styles.container}>
      {showCamera ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <Text style={styles.instructionText}>
              {documents[step].instruction}
            </Text>
            <Button
            mode="contained"
            title="Take Photo" onPress={handleTakePhoto} />
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
          {photos.length == 0 && (
          <>
          <View 
                      style={{
                width: '100%',
                padding: 16,

            }}
            >
            <Text style={styles.title}>
                Documents and Identity Verification
            </Text>
            <LottieView
                source={require('../../assets/images/card.json')}
                style={{ width: 200, height: 200 }}
                autoPlay
                loop
            />
            </View>

            <View
            style={{
                marginTop: 80,
                width: '100%',
                padding: 16,

            }}
            >
            <Text style={styles.instructions}>
                In this verification process, you will be asked to provide some personal information and documents.
            </Text>


            </View>


          <Button 
          mode="contained"
          title="Commencer" onPress={() => setShowCamera(true)} />
          </>
          
        ) }


          {photos.length > 0 && (
            <View style={styles.photosContainer}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Text>{photo.document.name}</Text>
                  <Image source={{ uri: photo.uri }} style={styles.photo} />
                </View>
              ))}
              <View style={styles.buttonContainer}>
                <Button 
                mode="contained"
                title="Recommencer" onPress={handleRestart} />
                <Button 
                mode="contained"
                title="Suivant" onPress={handleNext} />
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'left',
    fontFamily: 'MB',
},
instructions: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'M'
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
