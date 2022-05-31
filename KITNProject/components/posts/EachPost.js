import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

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
  subRedditFont: {
    fontSize: 15,
    color: '#0095FF'
  },
  author: {
    fontSize: 17
  }
});

function EachPost(props) {
  const navigation = useNavigation();

  return (
    <Layout style={styles.container} level='1'>
      <Card style={styles.card} >
        <Text
          style={styles.subRedditFont}
          onPress={() => {
            navigation.navigate('Subreddit',
              {
                subRedditName: props.post.data.subreddit_name_prefixed,
              });
          }}
        >
          {props.post.data?.subreddit_name_prefixed}
        </Text>
        {/* <Text></Text> */}

        <Text
          category="h5"
          onPress={() => navigation.navigate('Post', {
            postId: props.post.data.name
          })}
        >
          {props.post.data?.title}
        </Text>
        <Text
          style={styles.author}
        >
          Posted by {props.post.data?.author}
        </Text>
        <Text></Text>

        {[".jpg", "png"].some(el => props.post.data.preview?.images[0]?.source.url.includes(el)) &&
          <TouchableOpacity onPress={() =>
            navigation.navigate('Post', {
              postId: props.post.data.name
            })}>
            <Image
              style={{ width: 'auto', height: 200 }}
              source={{
                headers: { Authorization: `bearer ${props.token}` },
                uri: props.post.data.preview?.images[0]?.source.url.replaceAll(`amp;`, ``)
              }}
            />
          </TouchableOpacity>
        }
        {[".gif"].some(el => props.post.data.preview?.images[0]?.source.url.includes(el)) &&
          <TouchableOpacity onPress={() =>
            navigation.navigate('Post', {
              postId: props.post.data.name
            })}>
            <Image
              style={{ width: 'auto', height: 200 }}
              source={{
                headers: { Authorization: `bearer ${props.token}` },
                uri: props.post.data.url_overridden_by_dest
              }}
            />
          </TouchableOpacity>
        }

      </Card>
      {/* } */}
    </Layout>
  );
}

export default EachPost;