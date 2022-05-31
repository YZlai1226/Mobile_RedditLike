import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ScrollView, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Text } from '@ui-kitten/components';


// COMPONENTS
import PostsManager from '../components/posts/PostsManager.js';
// import VirtualizedScrollView from './../components/VirtualizedScrollView'

// STYLE
import Logo from './../assets/LogoWhite.png';
import { Layout } from '@ui-kitten/components';
import SearchBar from '../components/SearchBar.js';
import Filters from '../components/Filters.js';

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={Logo}
    />
  )
}

function HomeScreen(props) {
  const [token, setToken] = useState('');
  const [filter, setFilter] = useState('best');
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  useEffect(() => {
    retrieveToken();
    props.navigation.setOptions({
      headerLeft: (props) => <LogoTitle {...props} />,
      headerRight: () => (
        <Text
          onPress={() => props.navigation.navigate('Profile')}
          title="Profile"
          style={{ color: "#fff", fontSize: 15 }}
        >
          Profile
        </Text>
      )
    })
  }, []);

  useEffect(() => {
    if (token && filter) {
      getPosts();
    }
  }, [token, filter]);

  async function retrieveToken() {
    const retrievedToken = await AsyncStorage.getItem('@access_token');
    setToken(retrievedToken);
  }

  async function getPosts() {
    try {
      const res = await axios.get(`https://oauth.reddit.com/${filter}/.json`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(res.data.data.children);
    } catch (e) {
      console.warn('here', e);
    }
  }

  async function search() {
    const url = `https://www.reddit.com/search/.json?q=${query}`
    const response = await axios.get(url);
    setPosts(response.data.data.children);
    setFilter(query);
  }

  return (

    <ScrollView>
      <Layout style={styles.layout}>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <SearchBar setQuery={setQuery} query={query} search={search} />
            <Filters setFilter={setFilter} />
          <Text style={styles.filters}>Posts filtered by: {filter}</Text>
        <Text></Text>
        {posts.length > 0 &&
          <PostsManager posts={posts} token={token} />
        }
        </View>
      </Layout >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
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
    color: '#EDF1F7'
  }
});

export default HomeScreen;