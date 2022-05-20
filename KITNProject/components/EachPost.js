import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { Card, Text, Layout } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    height: 'auto',
    padding: 0,
  },

  controlContainer: {
    borderRadius: 4,
    margin: 2,
    // padding: 6,
    justifyContent: 'center',
    backgroundColor: '#3366FF',
  },
});



function EachPost(props) {
  // console.log('============ DATA CHILDREN PLEASE PLEASE PLEASE')
  console.log('============ DATA CHILDREN IS', props.data.url_overridden_by_dest)


  return (
    <Layout style={styles.container} level='1'>
      {console.log('data is')}
      <Card style={styles.card} >
        <Text
          category='h7'
          onPress={() => {
            props.navigation.navigate('SubredditScreen',
              {
                subRedditName: props.data.subreddit_name_prefixed,
              });
          }}
        >
          {props.data.subreddit_name_prefixed}
        </Text>
        <Text></Text>

        <Text
          category='h5'
            onPress={() => props.navigation.navigate('PostScreen')}
        >
          {props.data.title}
        </Text>
        <Text></Text>

        {/* <Button
          style={styles.button}
          status='warning'
          title={props.data.subreddit_name_prefixed}
          onPress={() => {
            props.navigation.navigate('SubredditScreen', {
              subRedditName: props.data.subreddit_name_prefixed,
            });
          }}
        /> */}
        {/* <Button
          title={props.data.title}
          onPress={() => props.navigation.navigate('PostScreen')}
        /> */}

        {[".gif", ".jpg"].some(el => props.data.url_overridden_by_dest.includes(el)) &&
        // {props.data.url_overridden_by_dest.some(el => ".gif", ".php", ".jpg") &&
          <Image
            style={{ width: 'auto', height: 200 }}
            source={{ uri: props.data.url_overridden_by_dest }}
          />
        }

      </Card>
      {/* } */}
    </Layout>
  );
}

export default EachPost;