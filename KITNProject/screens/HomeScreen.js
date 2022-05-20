import React, { useEffect, useState } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Image, ScrollView, Button, Text } from 'react-native';
import Logo from './../assets/LogoWhite.png';
import PostsManager from './../components/PostsManager.js';
import axios from 'axios';
import { Layout, ButtonGroup } from '@ui-kitten/components';

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');

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
    axios.get('https://reddit.com/top/.json?count=4')
      .then((response) => {
        setPosts(response.data.data.children),
          setFilter('Top')
      })
  }, []);

  async function getLatest() {
    axios.get('https://reddit.com/new/.json?count=20')
      .then((response) => {
        setPosts(response.data.data.children),
          setFilter('New')
      })
  }

  async function getBest() {
    axios.get('https://reddit.com/best/.json?count=20')
      .then((response) => {
        setPosts(response.data.data.children),
          setFilter('Best')
      })
  }

  async function getTop() {
    axios.get('https://reddit.com/top/.json?count=20')
      .then((response) => {
        setPosts(response.data.data.children),
          setFilter('Top')
      })
  }

  async function getControversial() {
    axios.get('https://reddit.com/controversial/.json?count=20')
      .then((response) => {
        setPosts(response.data.data.children),
          setFilter('Controversial')
      })
  }

  async function getRising() {
    axios.get('https://reddit.com/rising/.json?count=20')
      .then((response) => {
        setPosts(response.data.data.children),
          setFilter('Rising')
      })
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text></Text>
      <Text>Filters:</Text>
      <ButtonGroup>
        <Button
          onPress={() => getLatest()}
          title="New"
        />

        <Button
          onPress={() => getBest()}
          title="Best"
        />

        <Button
          onPress={() => getTop()}
          title="Top"
        />

        <Button
          onPress={() => getControversial()}
          title="Controversial"
        />

        <Button
          onPress={() => getRising()}
          title="Rising"
        />
      </ButtonGroup>

      <Text>Posts ordered by: {filter}</Text>
      <Text></Text>
      {posts.length > 0 &&
        <PostsManager navigation={navigation} posts={posts} />
      }
    </ScrollView>
  );
}
export default HomeScreen;