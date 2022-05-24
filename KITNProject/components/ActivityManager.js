import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import EachActivity from './EachActivity';
import { Layout } from '@ui-kitten/components';

function ActivityManager(props) {

  return (
    <>
      {props.comments.length > 0 &&
        props.comments.map((comment) => {
          {/* console.log('in comments manager each comment is ', comment) */ }
          return (
                <EachActivity {...comment} ></EachActivity>
          )
        })}
    </>
  );
}
export default ActivityManager;