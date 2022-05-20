import React from 'react';
import { Button, Text, View } from 'react-native';
import EachComment from './EachComment'

function CommentsManager(props) {

  return (
    <>
    {/* <Text>I am comments Manager</Text> */}
      {props.comments.length > 0 &&
        props.comments.map((comment) => {
          {/* console.log('in comments manager each comment is ', comment) */}
          return(
          <EachComment {...comment} ></EachComment>
          )
        })}
    </>
  );
}
export default CommentsManager;