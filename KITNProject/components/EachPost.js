import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
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
          onPress={() => props.navigation.navigate('PostScreen', {
            postId: props.data.name
          })}
        >
          {props.data.title}
        </Text>
        <Text
                  category='h8'
          style={{ fontStyle: 'italic' }}
        >
          Posted by {props.data.author_fullname}
        </Text>
        <Text></Text>


        {[".gif", ".jpg"].some(el => props.data.url_overridden_by_dest?.includes(el)) &&
          <TouchableOpacity onPress={() =>
            props.navigation.navigate('PostScreen', {
              postId: props.data.name
            })}>
            <Image
              style={{ width: 'auto', height: 200 }}
              source={{ uri: props.data.url_overridden_by_dest }}
            />
          </TouchableOpacity>
        }

      </Card>
      {/* } */}
    </Layout>
  );
}

export default EachPost;