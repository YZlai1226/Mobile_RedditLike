import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Image, View, ScrollView, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import PostsManager from '../components/posts/PostsManager';
import { Layout } from '@ui-kitten/components';
import Filters from '../components/Filters';


function SubredditScreen({ route, navigation }) {
  const { subRedditName } = route.params;
  const [subPosts, setSubPosts] = useState([]);
  const [subTitle, setSubTitle] = useState([]);
  const [subDes, setSubDes] = useState();
  const [subImage, setSubImage] = useState();
  const [unixDate, setUnixDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [filter, setFilter] = useState('');

  async function getFilteredPosts() {
    const res = await axios.get(`https://www.reddit.com/${subRedditName}/${filter}.json`);
    setSubPosts(res.data.data.children);
  }

  useEffect(() => {
    axios.get('https://www.reddit.com/' + subRedditName + '/.json')
      .then((response) => {
        setSubPosts(response.data.data.children)
      })
    axios.get('https://www.reddit.com/' + subRedditName + '/about.json')
      .then((response) => {
        setSubTitle(response.data.data?.title)
        setSubDes(response.data.data?.public_description)
        setSubImage(response.data.data.icon_img)
        setUnixDate(response.data.data.created_utc)
      })
  }, []);

  useEffect(() => {
    const date = new Date(unixDate * 1000);
    const realDate = date.toLocaleDateString("en-US");
    setFinalDate(realDate)
  }, [unixDate]);

  useEffect(() => {
    getFilteredPosts()
  }, [filter])

  return (
    <ScrollView>
      <Layout style={styles.layout}>
        {/* <View style={{ backgroundColor: '#87CEFA' /*flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> */}
        {/* <View style={{ flex: 1, flexDirection: 'column' }}> */}
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 20 }}>
        <Image
          style={{ width: 50, height: 50, margin: 15 }}
          source={{
            uri: subImage
          }}
        />
          <Text style={styles.title}>{subTitle}</Text>
          <Text style={styles.date}>created on {finalDate}</Text>
          <Text style={{ color: '#3b3c3d' }}>{subDes}</Text>
        </View>
        {/* </View> */}
        <View style={styles.filters} >
          <Filters setFilter={setFilter} />
        </View>
        {subPosts.length > 0 &&
          <PostsManager navigation={navigation} posts={subPosts} />
        }
        {/* </View> */}
      </Layout>
    </ScrollView>

  );
}
export default SubredditScreen;

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    backgroundColor: '#87CEFA',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3b3c3d'
  },
  date: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 10,
    color: '#3b3c3d'
  },
  filters: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});