import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import axios from 'axios';
import PostsManager from '../components/PostsManager';

import * as eva from '@eva-design/eva';
import { Layout, Button, Text, Input } from '@ui-kitten/components';

function NewPostScreen({ route, navigation}) {
/*   const { subRedditName } = route.params;
  const [subPosts, setSubPosts] = useState([]); */

/*   useEffect(() => {
    console.log('=========', 'https://www.reddit.com/'+ subRedditName + '/.json')
    axios.get('https://www.reddit.com/'+ subRedditName + '/.json')
      .then((response) => {
        setSubPosts(response.data.data.children)
      })
  }, []); */
  const ad = false;
  const sr = route.params.subId;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  async function submitPost() {
    const res = await axios.post('https://oauth.reddit.com//api/submit')
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Submit a post to {route.params.subId}
        </Text>

        <Input
          placeholder='Title'
          value={title}
          onChangeText={nextTitle => setTitle(nextTitle)}
        />

        <Input
          placeholder='Url'
          value={url}
          onChangeText={nextUrl => setUrl(nextUrl)}
        />

      </View>
    </ScrollView>
  );
}
export default NewPostScreen;