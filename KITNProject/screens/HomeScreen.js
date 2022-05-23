import React, { useEffect, useState } from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Button, Text, View } from 'react-native';
import Logo from './../assets/LogoWhite.png';
import PostsManager from './../components/PostsManager.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Layout, ButtonGroup, Input } from '@ui-kitten/components';

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
      <Text
        onPress={() => navigation.navigate('ProfileScreen')}
        title="Profile"
        style={{ color: "#fff", fontSize: 15 }}
      >
        Profile
      </Text>
    )
  })

  useEffect(() => { retrieveToken() }, []);

  useEffect(() => { getPosts() }, [token]);

  useEffect(() => { getPosts() }, [filter]);

  async function getPosts() {
    const url = `https://oauth.reddit.com/${filter}/.json`;
    console.log('url:', url);
    // const res = await axios.get(url, { headers: { Authorization: 'Bearer ' + token } });
    const res = await axios.get(`https://www.reddit.com/${filter}/.json?count=20`, {
      headers: {
        Authorization: 'Basic RlF5bGd4djBDdHdKTDVwa3pHd1o1QTo='
      }
    });
    setPosts(res.data.data.children);
  }

  // Search

  const [query, setQuery] = useState('')

  async function search() {
    const url = `https://www.reddit.com/search/.json?q=${query}`
    const response = await axios.get(url);
    setPosts(response.data.data.children);
  }

  return (

    <ScrollView
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Layout style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row', width: '100%', paddingTop: 10 }}>
            <Input
              placeholder='Search'
              value={query}
              onChangeText={nextQuery => setQuery(nextQuery)}
              style={{ width: '85%' }}
            />

            <Button
              onPress={() => search()}
              title="Go"

            />
          </View>
          {/* <ButtonGroup>
        </ButtonGroup> */}
          <Text></Text>
          <ButtonGroup>
            <Button
              onPress={() => setFilter('new')}
              title="New"
              appearance='ghost'
              status='basic'
            // style={styles.filters}
            />

            <Button
              onPress={() => setFilter('best')}
              title="Best"
              appearance='ghost'
              status='basic'
            // style={styles.filters}
            />

            <Button
              onPress={() => setFilter('top')}
              title="Top"
              appearance='ghost'
              status='basic'
            // style={styles.filters}
            />

            <Button
              onPress={() => setFilter('controversial')}
              title="Controversial"
              appearance='ghost'
              status='basic'
            // style={styles.filters}
            />

            <Button
              onPress={() => setFilter('rising')}
              title="Rising"
              appearance='ghost'
              status='basic'
            // style={styles.filters}
            />
          </ButtonGroup>

          <Text style={styles.filters}>Posts ordered by: {filter}</Text>
          <Text></Text>
          {posts.length > 0 &&
            <PostsManager navigation={navigation} posts={posts} />
          }
        </View>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 'auto',
    padding: 0,
  },

  controlContainer: {
    borderRadius: 4,
    margin: 2,
    // padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },

  filters: {
    color: '#EDF1F7',
  }
});

export default HomeScreen;