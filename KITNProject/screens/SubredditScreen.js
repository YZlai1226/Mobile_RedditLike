import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, View, ScrollView } from 'react-native';
import axios from 'axios';
import PostsManager from '../components/PostsManager';

function SubredditScreen({ route, navigation}) {
  const { subRedditName } = route.params;
  const [subPosts, setSubPosts] = useState([]);



  useEffect(() => {
    axios.get('https://www.reddit.com/'+ subRedditName + '/.json')
      .then((response) => {
        setSubPosts(response.data.data.children)
      })
  }, []);
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>I am the Subreddit Page !!</Text> */}
        { subPosts.length>0 &&
        <PostsManager navigation={navigation} posts={subPosts} />
        }
      </View>
    </ScrollView>
  );
}
export default SubredditScreen;