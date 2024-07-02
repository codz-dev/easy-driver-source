import { AppState, Platform, Button, Text, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import Tabs from './components/Tabs';
import Step1 from './screens/verification/Step1';
import Step2 from './screens/verification/Step2';
import Liveness from './screens/verification/Liveness';
import Docs from './screens/verification/Docs';
import Car from './screens/verification/Car';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as Font from 'expo-font';
import { Asset } from 'expo-asset';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const Stack = createStackNavigator();


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isSplashReady, setSplashReady] = useState(false);
  const navigationContainerRef = useRef()
  const [initialScreen, setInitialScreen] = useState('LoadingScreen')

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);


 
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // fetch balance
  
        // Check for updates and navigate if needed
        await checkForUpdates();
      }
  
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };
  
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    // Clean up the subscription on component unmount
    return () => {
      subscription.remove();
    };
  }, []);
  
  async function checkForUpdates() {
    try {
      const token = 'Hn6d3xB7Gt34dOKxE';
      const response = await fetch('https://tala3.codz.dev/version', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      const latestVersion = data.version;
  
      if (latestVersion > 50) {
        // Navigate to the 'UpdateScreen' if an update is available
        updateScreen();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des mises à jour', error);
    }
  }
  
  function updateScreen() {
    navigationContainerRef.current?.navigate('UpdateScreen');
  }

  

    async function checkForUpdates2() {
      try {
        const token = 'Hn6d3xB7Gt34dOKxE';
        const response = await fetch('https://tala3.codz.dev/version', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
  
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
  
        const data = await response.json();
  
        const latestVersion = data.version;
  
        if (latestVersion > 50) {
          setInitialScreen('UpdateScreen');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification des mises à jour', error);
      }
    }
  
    checkForUpdates2();
 
  


  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));








      
      

  }, []);


 
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        sound: "notif1.wav",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C"
      });
    }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Please enable notifications in your settings");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "b7abba0b-a235-4047-bded-58d51151ebb4",
        })
      ).data;
   

    return token;
  }

  const sendNotification = async () => {

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };




  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          M: require('./assets/fonts/latin.ttf'),
          MB: require('./assets/fonts/latin-bold.ttf'),
        });
        const iconImages = [

          // Ajouter d'autres images ici
        ];

        // Charger toutes les images de manière asynchrone
        const cacheImages = iconImages.map(image => {
          return Asset.fromModule(image).downloadAsync();
        });

        // Attendre que toutes les images soient chargées
        await Promise.all(cacheImages);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        setSplashReady(true)
      }
    }

    loadResourcesAndDataAsync();
  }
    , []);

  useEffect(() => {
    if (isSplashReady) {
      SplashScreen.hideAsync();
    }
  }

    , [isSplashReady]);

  if (!isLoadingComplete) {
    return null;
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <NavigationContainer
      ref={navigationContainerRef}
    >
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen name="Step1" component={Step1} options={{ headerShown: false }} />
        <Stack.Screen name="Step2" component={Step2} options={{ headerShown: false }} />
        <Stack.Screen name="Liveness" component={Liveness} options={{ headerShown: false }} />
        <Stack.Screen name="Docs" component={Docs} options={{ headerShown: false }} />
        <Stack.Screen name="Car" component={Car} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
