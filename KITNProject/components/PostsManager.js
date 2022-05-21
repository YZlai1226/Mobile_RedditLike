import React from 'react';
import { Button, Text, View } from 'react-native';
import EachPost from './EachPost.js';

function PostsManager(props) {

  const subreddits = props.posts.map((post) => {
    <Text>{post.data.subreddit}</Text>
  });

  return (
    <>
      {props.posts.length > 0 &&
        props.posts.map((post) => {
          return(
          <EachPost key={post.id} navigation={props.navigation} {...post} ></EachPost>
          )
        })}
    </>
  );
}
export default PostsManager;