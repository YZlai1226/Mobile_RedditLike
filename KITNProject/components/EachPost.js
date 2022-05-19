import * as React from 'react';
import { Button, Text } from 'react-native';

function EachPost(props) {
  return (
    <>
        {/* <Text>I am Each post !!</Text> */}

        {/* {props.post.length>0 &&
      console.log('here', props.post)} */}
        {/* <Text>{props.data.subreddit}</Text> */}
        
        <Button 
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
        />
        <Text>=======================================</Text>
    </>
  );
}
export default EachPost;