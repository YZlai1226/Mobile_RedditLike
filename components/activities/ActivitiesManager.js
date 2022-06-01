import React from 'react';
import EachActivity from './EachActivity';

function ActivityManager(props) {

  return (
    <>
      {props.comments.length > 0 &&
        props.comments.map((comment) => {
          return (
                <EachActivity key={comment.data.id} {...comment} ></EachActivity>
          )
        })}
    </>
  );
}
export default ActivityManager;