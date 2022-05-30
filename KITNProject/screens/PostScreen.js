import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { View, ScrollView, Image, Linking, StyleSheet } from 'react-native';
import axios from 'axios';
import CommentsManager from '../components/CommentsManager';
import { Card, Text } from '@ui-kitten/components';
import Context from '../context';


function PostScreen(props) {
  const { postId } = props.route.params;
  const [post, setPost] = useState([]);
  const [subReddit, setSubReddit] = useState();
  const [comments, setComments] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [date, setDate] = useState([]);
  const context = useContext(Context);

  async function getPost() {
    console.log('postId is', postId)
    const res = await axios.get('https://api.reddit.com/api/info/?id=' + postId)
    setPost(res.data.data.children[0].data)
    setSubReddit(res.data.data.children[0].data?.subreddit)
    setRewards(res.data.data.children[0].data?.all_awardings)
  }

  useEffect(() => {
    getPost()
  }, []);

  useEffect(() => {
    if (subReddit !== undefined) {
      axios.get('https://oauth.reddit.com/r/' + subReddit + '/comments/' + postId.substring(3) + '.json', {
        headers: {
          Authorization: `Bearer ${context.accessToken}`
        }
      })
        .then((response) => {
          setComments(response.data[1].data.children)
        })
    }
  }, [subReddit]);

  // useEffect(() => {
  //   if (subReddit !== undefined) {
  //     axios.get('https://www.reddit.com/r/' + subReddit + '/comments/' + postId.substring(3) + '.json')
  //       .then((response) => {
  //         setComments(response.data[1].data.children)
  //       })
  //   }
  // }, [subReddit]);

  return (
    <ScrollView>
      <Card>
        <View>
          <Text style={{ color: 'lightgray', fontStyle: 'italic', color: '#94CBFF' }}>{post.subreddit_name_prefixed} ‧ posted by {post.author_fullname}</Text>
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
