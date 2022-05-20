import React from 'react';
import { Button, Text, View } from 'react-native';

function EachComment(props) {

  return (
    <>
    {/* <Text>I am each comment</Text> */}
    <Text>comment content:</Text>
    <Text>{props.data.body}</Text>
    <Text>=================</Text>
    </>
  );
}
export default EachComment;