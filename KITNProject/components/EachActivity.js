import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import datetime from 'react-datetime';

function EachComment(props) {
  const [date, setDate] = useState()

  useEffect(() => {
    const date = new Date(props.data.created_utc * 1000);
    const realDate = date.toLocaleDateString("en-US");
    setDate(realDate)
  }, []);

  return (
    <>
      {props.kind == 't3'
        ?
        <>
          <Card style={styles.card}>
            <Text style={{ color: 'orange' }}>Post</Text>
            {/* <View style={{ display:'flex', flexDirection:'row' }}> */}
            <Text style={styles.author}>{props.data.title}</Text>
            <Text style={styles.date}>Posted on {date} in {props.data.subreddit_name_prefixed}</Text>
            <Text style={styles.author}>{props.data.selftext}</Text>
            {/* </View> */}
            <Text></Text>
            <Text>{props.data.body}</Text>
          </Card>
        </>
        :
        <>
          <Card style={styles.card}>
            <Text style={{ color: 'orange' }}>Comment</Text>
            {/* <View style={{ display:'flex', flexDirection:'row' }}> */}
            <Text style={styles.date}>Commented on {date} in reply to {props.data.link_title}</Text>
            {/* </View> */}
            <Text>{props.data.body}</Text>
          </Card>
        </>
      }
    </>
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
