import React, { useEffect, useState } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View, Image, ScrollView } from 'react-native';
import Logo from './../assets/LogoWhite.png';
import PostsManager from './../components/PostsManager.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ButtonGroup, Input } from '@ui-kitten/components';

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

function HomeScreen({ navigation }) {
  const [token, setToken] = useState('');
  const [filter, setFilter] = useState('best');
  const [posts, setPosts] = useState([]);

  async function retrieveToken() {
    const retrievedToken = await AsyncStorage.getItem('@access_token');
    console.log('access token:', retrievedToken);
    setToken(retrievedToken);
  }

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

  useEffect(() => { retrieveToken() }, []);

  useEffect(() => { getPosts() }, [token]);

  useEffect(() => { getPosts() }, [filter]);

  async function getPosts() {
    const res = await axios.get(`https://oauth.reddit.com/${filter}/.json?count=20`, { headers: { Authorization: 'Bearer ' + token } });
    setPosts(res.data.data.children);
  }

  const [query, setQuery] = useState('')

  async function search() {
    const url = `https://www.reddit.com/search/.json?q=${query}`
    const response = await axios.get(url);
    setPosts(response.data.data.children);
    setFilter(query)
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text></Text>
      <ButtonGroup>
        <Button
          onPress={() => setFilter('new')}
          title="New"
        />

        <Button
          onPress={() => setFilter('best')}
          title="Best"
        />

        <Button
          onPress={() => setFilter('top')}
          title="Top"
        />

        <Button
          onPress={() => setFilter('controversial')}
          title="Controversial"
        />

        <Button
          onPress={() => setFilter('rising')}
          title="Rising"
        />
      </ButtonGroup>

      <ButtonGroup>
        <Input
          placeholder='Search'
          value={query}
          onChangeText={nextQuery => setQuery(nextQuery)}
        />

        <Button
          onPress={() => search()}
          title="Go"
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