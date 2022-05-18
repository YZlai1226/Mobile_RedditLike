import * as React from 'react';
import { Button, Text } from 'react-native';

function EachPost(props) {
  return (
    <>
        <Text>I am Each post !!</Text>

        {/* {props.post.length>0 &&
      console.log('here', props.post)} */}
        <Text>{props.data.subreddit}</Text>
        <Button
          title="Go to SubredditPage"
          onPress={() => props.navigation.navigate('SubredditScreen')}
        />
        <Button
          title="Go to PostPage"
          onPress={() => props.navigation.navigate('PostScreen')}
        />
    </>
  );
}
export default EachPost;