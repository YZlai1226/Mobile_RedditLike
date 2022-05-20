import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import EachComment from './EachComment'
import { Layout } from '@ui-kitten/components';

function CommentsManager(props) {

  return (
    <>
      {props.comments.length > 0 &&
        props.comments.map((comment) => {
          {/* console.log('in comments manager each comment is ', comment) */ }
          return (
            <React.Fragment>
              <Layout style={styles.topContainer}>
                <EachComment {...comment} ></EachComment>
              </Layout>
            </React.Fragment>
          )
        })}
    </>
  );
}
export default CommentsManager;

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'space-between',
  },
});