import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView, Image, Linking, StyleSheet } from 'react-native';
import axios from 'axios';
import CommentsManager from '../components/CommentsManager';
import { Card, Layout, Text } from '@ui-kitten/components';


function PostScreen({ route }) {
  const { postId } = route.params;
  const [post, setPost] = useState([]);
  const [subReddit, setSubReddit] = useState();
  const [comments, setComments] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [date, setDate] = useState([]);

  async function getPost() {
    const res = await axios.get('https://api.reddit.com/api/info/?id=' + postId)
    // console.log('res isssss ', res)
    // console.log('======', res.data.data.children[0].data.subreddit)
    // console.log('one post is ', response.data.data.children)
    setPost(res.data.data.children[0].data)
    setSubReddit(res.data.data.children[0].data?.subreddit)
    setRewards(res.data.data.children[0].data?.all_awardings)
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
      <Card>
        <View>
          <Text style={{ color: 'lightgray', fontStyle: 'italic' }}>{post.subreddit_name_prefixed} ‧ posted by {post.author_fullname}</Text>
          <Text category='h6'>{post.title}</Text>
          <Text></Text>
          <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {rewards.length > 0 &&
              rewards.map((reward) => {
                return (
                  <>
                    <Image
                      source={{
                        width: 15,
                        height: 15,
                        uri: reward.icon_url
                      }}
                    />
                    <Text style={{ color: 'lightgray' }}>{reward.count}</Text>
                  </>
                )
              })}
          </View>
          <Text></Text>
          {[".gif", ".jpg"].some(el => post.url_overridden_by_dest?.includes(el)) &&
            <Image
              style={{ width: 'auto', height: 200 }}
              source={{
                uri: post.url_overridden_by_dest
              }}
            />
          }
          <Text style={{ color: 'lightgray', fontStyle: 'italic' }}
            onPress={() => Linking.openURL(post.url_overridden_by_dest)}>
            {post.url_overridden_by_dest}
          </Text>
          <Text></Text>
          <Text>Comments</Text>
          {comments.length > 0 &&
            <CommentsManager comments={comments} />
          }
        </View>
      </Card>
    </ScrollView>
  );
}
export default PostScreen;
