import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Context from './context';

// SCREENS
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PostScreen from './screens/PostScreen.js';
import SubredditScreen from './screens/SubredditScreen.js';

// STYLE
import Logo from './assets/LogoWhite.png';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import { ApplicationProvider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    async function retrieveStatus() {
      const res = await AsyncStorage.getItem('@access_token');
      if (res) {
        setIsLoggedIn(true);
        setAccessToken(res);
        console.log('token is', res)
      } else {
        setIsLoggedIn(false);
      }
    };
    retrieveStatus();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <NavigationContainer>
        <Context.Provider value={{ setIsLoggedIn, accessToken, setAccessToken }}>
          <Stack.Navigator
            {...eva} theme={{ ...eva.dark, ...theme }}
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1F1F1F',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerBackTitleStyle: (props) => <LogoTitle {...props} />,
            }}>
            {isLoggedIn ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Subreddit" component={SubredditScreen} />
                <Stack.Screen name="Post" component={PostScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            )}
          </Stack.Navigator>
        </Context.Provider>
      </NavigationContainer>
    </ApplicationProvider >
  );
}