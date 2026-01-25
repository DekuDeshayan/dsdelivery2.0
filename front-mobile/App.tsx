import 'react-native-gesture-handler';
import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Header from './src/Header';
import Home from './src/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/Routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });



  // const onLayoutRootView = useCallback(async (): Promise<void> => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   // Splash screen stays visible
  //   return null;
  // }

    if (!fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading…</Text>
          <ActivityIndicator size="large" />
        </View>
      </GestureHandlerRootView>
    );
  }


  return (
      <GestureHandlerRootView
        style={styles.container}
        //onLayout={onLayoutRootView}
        >
        <StatusBar style="auto" />
        <Routes/>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
