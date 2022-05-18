import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View, Image } from 'react-native';
import Logo from './../assets/LogoWhite.png';
import PostsManager from './../components/PostsManager.js';

function LogoTitle() {
  return (
    <Image
    style={{ width: 35 , height: 35 }}
    source={Logo}
    />
  ) 
}

function HomeScreen({ navigation }) {
  console.log(navigation.access_token);
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
      <PostsManager navigation={navigation}/>
    </View>
  );
}
export default HomeScreen;