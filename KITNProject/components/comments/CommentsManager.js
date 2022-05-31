import React from 'react';
import EachComment from './EachComment'
import { FlatList } from 'react-native-gesture-handler';

function CommentsManager(props) {

  return (
    // <>
    //   {props.comments.length > 0 &&
    //     props.comments.map((comment) => {
    //       return (
    //         <EachComment key={comment.data.id} {...comment} ></EachComment>
    //       )
    //     })}
    // </>
    <>
    {props.comments.length > 0 &&
      <FlatList
        keyExtractor={(comment, index) => index.toString()}
        data={props.comments}
        renderItem={({ item }) => (
          <EachComment key={item.data.name.toString()} comment={item} >item is {item.data.name}</EachComment>
        )}
      />
    }
  </>
  );
}
export default CommentsManager;
