import * as React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
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
    style={{ width: 35 , height: 35 }}
    source={Logo}
    />
  ) 
}

function App() {
// if (connected) {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
    );
    // }
    // else {
      // <NavigationContainer>
      {/* <Stack.Navigator/> */}
      // <Stack.Screen name="Login" component={LoginScreen} />
      // </Stack.Navigator>
      // </NavigationContainer>
      // }
  }
  
  export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
