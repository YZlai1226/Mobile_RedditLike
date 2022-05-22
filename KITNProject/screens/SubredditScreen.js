import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import PostsManager from '../components/PostsManager';
import datetime from 'react-datetime';
import { ButtonGroup, Layout } from '@ui-kitten/components';


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
        setSubImage(response.data.data.banner_img)
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
      <Layout style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.banner}>
          <Text style={styles.title}>{subTitle}</Text>
          <Text style={styles.date}>created on {finalDate}</Text>
          <Text style={{ color: 'white' }}>{subDes}</Text>
        </View>

        {/* Filters */}
        <View>
          <ButtonGroup>
            <Button
              onPress={() => setFilter('new')}
              title="New"
            />

            <Button
              onPress={() => setFilter('best')}
              title="Best"
            />

            <Button
              onPress={() => setFilter('top')}
              title="Top"
            />

            <Button
              onPress={() => setFilter('controversial')}
              title="Controversial"
            />

            <Button
              onPress={() => setFilter('rising')}
              title="Rising"
            />
          </ButtonGroup>
        </View>

        {subPosts.length > 0 &&
          <PostsManager navigation={navigation} posts={subPosts} />
        }
      </View>
      </Layout>
    </ScrollView>
  );
}
export default SubredditScreen;

const styles = StyleSheet.create({
  banner: {
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  date: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 10,
    color: 'white'
  }
});