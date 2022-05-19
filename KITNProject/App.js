import * as React from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PostScreen from './screens/PostScreen.js';
import SubredditScreen from './screens/SubredditScreen.js';
import Logo from './assets/LogoWhite.png';
import { REDIRECT_URI, CLIENT_ID } from "@env";

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
      clientId: CLIENT_ID,
      scopes: ['*'],
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      AsyncStorage.setItem('access_token', code)
      console.log(AsyncStorage.getItem('access_token'));
      setIsLoggedIn(true);
      setAccessToken(code);
    }
  }, [response]);

  if (isLoggedIn === false) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          rowGap: 20,
          padding: 30,
          alignItems: 'flex-end',
        }}>

        <TouchableOpacity
          style={{
            backgroundColor: 'lavender',
            borderRadius: 5,
            padding: 10,
            width: 100,
            textAlign: 'center',
          }}
        >
          <Text>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'lavender',
            borderRadius: 5,
            padding: 10,
            width: 100,
            textAlign: 'center',
          }}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <Text>
          The reddit client that will make you purr.
        </Text>

        <Text style={{
          textAlign: 'right',
          color: 'darkgray',
          fontSize: 50,
        }}>
          Welcome to KITN.
        </Text>

        <View>

        </View>
      </View>
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