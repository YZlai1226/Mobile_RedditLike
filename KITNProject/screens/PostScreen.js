import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { View, ScrollView, Image, Linking, StyleSheet } from 'react-native';
import axios from 'axios';
import CommentsManager from '../components/comments/CommentsManager';
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
          <Text style={{ color: 'lightgray', fontStyle: 'italic', color: '#94CBFF' }}>{post.subreddit_name_prefixed} ‧ posted by {post.author}</Text>
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
          {[".gif", ".jpg"].some(el => post.preview?.images[0]?.source.url.includes(el)) &&
            <Image
            style={styles.image}
              source={{
                headers: { Authorization: `bearer ${props.token}` },
                uri: post.preview?.images[0]?.source.url.replace(`amp;`, ``)
              }}
            />
        }
        <Text></Text>
          <Text>{post.selftext}</Text>

          <Text style={{ color: 'lightgray', fontStyle: 'italic' }}
            onPress={() => Linking.openURL(post.preview?.images[0]?.source.url)}>
            {post.preview?.images[0]?.source.url}
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

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: 300,
  },
})

export default PostScreen;

