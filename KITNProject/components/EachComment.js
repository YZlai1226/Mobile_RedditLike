import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';
import datetime from 'react-datetime';

function EachComment(props) {
  const [ date, setDate ] = useState()

  useEffect(() => {
    const finalDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(props.data.created_uct)
    setDate(finalDate)
  }, []);

  return (
        <Card style={ styles.card }>
          {/* <View style={{ display:'flex', flexDirection:'row' }}> */}
            <Text style={styles.author}>{props.data.author}</Text>
            <Text style={styles.date}>commented on {date}</Text>
          {/* </View> */}
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
  },
  author: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'lightgray'
  },
  date: {
    fontStyle: 'italic',
    color: 'lightgray',
    fontSize: '11px',
    marginBottom: 10
  }
});
