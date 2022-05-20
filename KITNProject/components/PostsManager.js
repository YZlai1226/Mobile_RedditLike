import React from 'react';
import { Button, Text, View } from 'react-native';
import EachPost from './EachPost.js';

function PostsManager(props) {

  const subreddits = props.posts.map((post) => {
    <Text>{post.data.subreddit}</Text>
  });

  return (
    <>
      {/* <Text>I am the posts Manager !!</Text> */}
      {/* {console.log('my props are ', props.posts)} */}
      {props.posts.length > 0 &&
        props.posts.map((post) => {
          // console.log('post.subreddit is', post.data.subreddit);
          return(
          // <Text>{post.data.subreddit}</Text>
          <EachPost navigation={props.navigation} {...post} ></EachPost>
          )
        })}
    </>
  );
}
export default PostsManager;