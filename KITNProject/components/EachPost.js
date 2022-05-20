import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button, Layout } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '10px',
  },
  button: {
    margin: 2,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
});

function EachPost(props) {
  return (
    <Layout style={styles.container} level='1'>
      <Card>
        {/* <Text>I am Each post !!</Text> */}

        {/* {props.post.length>0 &&
      console.log('here', props.post)} */}
      
        {/* <Text>{props.data.subreddit}</Text> */}

        <Button
          style={styles.button}
          title={props.data.subreddit_name_prefixed}
          onPress={() => {
            props.navigation.navigate('SubredditScreen', {
              subRedditName: props.data.subreddit_name_prefixed,
            });
          }}
        />
        <Button
          title={props.data.title}
          onPress={() => props.navigation.navigate('PostScreen')}
          onPress={() => {
          props.navigation.navigate('PostScreen', {
            postId: props.data.name,
          });
        }}
        />
        <Text>=======================================</Text>
      </Card>
    </Layout>
  );
}

export default EachPost;