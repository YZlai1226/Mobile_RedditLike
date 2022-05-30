import React from 'react';
import EachComment from './EachComment'

function CommentsManager(props) {

  return (
    <>
      {props.comments.length > 0 &&
        props.comments.map((comment) => {
          return (
            <EachComment key={comment.data.id} {...comment} ></EachComment>
          )
        })}
    </>
  );
}
export default CommentsManager;
