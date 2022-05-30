import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

function EachComment(props) {
  const [ date, setDate ] = useState()

  useEffect(() => {
    const date = new Date(props.data.created_utc * 1000);
    const realDate = date.toLocaleDateString("en-US");
    setDate(realDate)
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
    borderBottom: 3
  },
  author: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'lightgray'
  },
  date: {
    fontStyle: 'italic',
    color: 'lightgray',
    fontSize: 11,
    marginBottom: 10
  }
});
