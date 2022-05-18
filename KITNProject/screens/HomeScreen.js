import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View, Image } from 'react-native';
import Logo from './../assets/LogoWhite.png';

function LogoTitle() {
  return (
    <Image
    style={{ width: 35 , height: 35 }}
    source={Logo}
    />
  ) 
}

function HomeScreen({ navigation }) {
  navigation.setOptions({
    headerLeft: (props) => <LogoTitle {...props} />,
    headerRight: () => (
      <Button
      onPress={() => navigation.navigate('ProfileScreen')}
      title="Profile"
        color="#fff"
      />
    )
  })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>I am the Home Page !!</Text>
      <Button
        title="Go to Test"
        onPress={() => navigation.navigate('TestScreen')}
      />
    </View>
  );
}
export default HomeScreen;