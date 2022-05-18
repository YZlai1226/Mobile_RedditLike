import * as React from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import PostScreen from './screens/PostScreen.js';
import SubredditScreen from './screens/SubredditScreen.js';
import Logo from './assets/LogoWhite.png';

const Stack = createNativeStackNavigator();
// const Tabs = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

// WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'FQylgxv0CtwJL5pkzGwZ5A',
      scopes: ['*'],
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: 'exp://10.41.160.161:19000',
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log(response);
      AsyncStorage.setItem('access_token', code)
      console.log(AsyncStorage.getItem('access_token'));
      setIsLoggedIn(true);
      setAccessToken(code);
    }
  }, [response]);

  if (isLoggedIn === false) {
    return (
      <SafeAreaView>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          accessToken={accessToken}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleStyle: (props) => <LogoTitle {...props} />,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          // options= {({ navigation, route }) => ({

          // })}

          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SubredditScreen" component={SubredditScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}