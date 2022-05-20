import React, { useEffect, useState } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { View, Image, ScrollView } from 'react-native';
import Logo from './../assets/LogoWhite.png';
import PostsManager from './../components/PostsManager.js';
import axios from 'axios';
import { Layout, Button, Text } from '@ui-kitten/components';

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

function HomeScreen({ navigation }) {
  const [topPosts, setTopPost] = useState([]);
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

  useEffect(() => {
    axios.get('https://reddit.com/top/.json?count=20')
      .then((response) => {
        // console.log('data is', response.data);
        setTopPost(response.data.data.children)
        // console.log('what I want is ', response.data.data.children);
        // console.log('topPosts ', topPosts);
      })
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Layout
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          rowGap: 20,
          padding: 30,
          alignItems: 'flex-end',
        }}>
        <Text>I am the Home Page !!</Text>
        {topPosts.length > 0 &&
          <PostsManager navigation={navigation} posts={topPosts} />
        }
      </Layout>
    </ScrollView>
  );
}
export default HomeScreen;