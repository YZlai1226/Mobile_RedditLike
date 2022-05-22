import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { REDIRECT_URI, CLIENT_ID } from "@env";
import axios from 'axios';
import qs from 'qs';

// Components
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PostScreen from './screens/PostScreen.js';
import SubredditScreen from './screens/SubredditScreen.js';

// Style
import Logo from './assets/LogoWhite.png';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

WebBrowser.maybeCompleteAuthSession();

//Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "FQylgxv0CtwJL5pkzGwZ5A",
      scopes: ['*'],
      // redirectUri: "exp://10.41.160.161:19000"
      redirectUri: "exp://192.168.1.61:19000"
    },
    discovery
  );

  React.useEffect(() => {
    console.log('checking if user is logged in');
    async function retrieveToken() {
      const retrievedToken = await AsyncStorage.getItem('@access_token');
      console.log('retrieved token:', retrievedToken);
      setAccessToken(retrievedToken);
    };
    if (retrieveToken() !== null) {
      setIsLoggedIn(true)
    }
  }, []);

  React.useEffect(() => {
    async function getToken(code) {
      const url = "https://www.reddit.com/api/v1/access_token";
      const res = await axios({
        method: 'post',
        url: url,
        data: qs.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: "exp://192.168.1.61:19000"
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic RlF5bGd4djBDdHdKTDVwa3pHd1o1QTo='
        },
      });
      if (res.data.access_token) {
        await AsyncStorage.setItem('@access_token', res.data.access_token);
        setIsLoggedIn(true);
      }
    };
    if (response?.type === 'success') {
      const code = response.params.code;
      getToken(code);
    }
  }, [response]);

  if (isLoggedIn === false) {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Layout
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            rowGap: 20,
            padding: 30,
            alignItems: 'flex-end',
          }}>

          <Button>
            Register
          </Button>

          <Button
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            Login
          </Button>

          <Text>
            The reddit client that will make you purr.
          </Text>

          <Text style={{
            textAlign: 'right',

            fontSize: 50,
          }}>
            Welcome to KITN.
          </Text>

          <View>

          </View>
        </Layout>
      </ApplicationProvider>
    );
  } else {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
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
            />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="SubredditScreen" component={SubredditScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    )
  }
}