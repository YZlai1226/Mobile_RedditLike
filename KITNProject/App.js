import * as React from 'react';
import { useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import PostScreen from './screens/PostScreen.js';
import SubredditScreen from './screens/SubredditScreen.js';
import Logo from './assets/LogoWhite.png';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json'; // <-- Import app theme
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';

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
      clientId: "XFWAmnjJ12hDFqZc2w8eXg",
      scopes: ['*'],
      redirectUri: "exp://10.41.97.225:19000"
    },
    discovery
  );

  async function checkLogin() {
    token = await AsyncStorage.getItem('@access_token')
    console.log('token:', token);
    if (token) {
      setIsLoggedIn(true)
    }
  }

  React.useEffect(async () => {
    checkLogin();
    if (response?.type === 'success') {
      const code = response.params.code;
      console.log('okokokokokokok')
      await AsyncStorage.setItem('@access_token', code)
      setIsLoggedIn(true);
      setAccessToken(code);
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
          // options= {({ navigation, route }) => ({

          // })}

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