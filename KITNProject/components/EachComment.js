import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

function EachComment(props) {

  return (
        <Card style={ styles.card }>
        <Text style={{ fontStyle: 'bold' }}>{props.data.author}</Text>
        <Text></Text>
        <Text>{props.data.body}</Text>
        </Card>
  );
}
export default EachComment;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginTop: '20px',
    marginBottom: '20px'
  }
});
