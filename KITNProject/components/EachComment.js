import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

function EachComment(props) {

  return (
        <Card style={ styles.card }>
        <Text category='h7'>{props.data.author}</Text>
        <Text></Text>
        <Text>{props.data.body}</Text>
        </Card>
  );
}
export default EachComment;

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    border: 'none',
    borderBottom: "3px"
  }
});
