import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import CommentsManager from '../components/CommentsManager';


function PostScreen({ route }) {
  const { postId } = route.params;
  const [ post, setPost ] = useState([]);
  const [ subReddit, setSubReddit ] = useState();
  const [ comments, setComments ] = useState([]);

  async function getPost() {
    const res = await axios.get('https://api.reddit.com/api/info/?id=' + postId)
    // console.log('res isssss ', res)
    // console.log('======', res.data.data.children[0].data.subreddit)
        // console.log('one post is ', response.data.data.children)
    setPost(res.data.data.children[0].data)
    setSubReddit(res.data.data.children[0].data.subreddit)
  }

  useEffect(() => {
    getPost()
    }, []);

  useEffect(() => {
    if (subReddit !== undefined) {
    axios.get('https://www.reddit.com/r/' + subReddit + '/comments/' + postId.substring(3) + '.json')
      .then((response) => {
        // console.log('============================')
        // console.log('comments are ', response.data[1].data.children)
        setComments(response.data[1].data.children)
      })
    }
  }, [subReddit]);
  

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>I am the One Post Page !!</Text> */}
        { comments.length>0 &&
        <CommentsManager comments={comments} />
        }
      </View>
    </ScrollView>
  );
}
export default PostScreen;