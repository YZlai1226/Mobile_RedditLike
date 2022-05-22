import * as React from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentsManager from '../components/CommentsManager';

function UserProfile() {
  const [token, setToken] = React.useState('');
  const [UserData, setUserData] = React.useState([]);
  const [UserActivity, setUserActivity] = React.useState([]);

  async function retrieveToken() {
    const retrievedToken = await AsyncStorage.getItem('@access_token');
    setToken(retrievedToken);
  }
  async function GetUserData() {
    try {
      const res = await axios.get("https://oauth.reddit.com/api/v1/me.json", {
        headers: { 'Authorization': 'Bearer ' + token }
      })
      console.log('res.data:', res.data);
      setUserData(res.data)
    } catch {
      console.log('data fetching failed');
    }
  }
  async function GetUserActivity() {
    try {
      const res = await axios.get("https:/reddit.com/user/" + UserData.name + ".json", {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      setUserActivity(res.data.data.children)
      // console.log("++++++++++++++++++++++++++++++++++++++++++", UserActivity.data.data.children);
      console.log("////////////////////////", UserActivity);
    } catch {
      console.log('User activity fetching failed');
    }
  }

  React.useEffect(() => { retrieveToken() }, []);

  React.useEffect(() => { GetUserData() }, [token]);

  /* React.useEffect(() => { GetUserActivity() }, [UserData]); */

  if (UserData) {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          marginTop: "5%",
          marginLeft: "5%",
          marginRight: "5%",
  
        }}>
  
          <TouchableOpacity onPress={() => console.log("image pressed")}>
            <Image
              source={{
                width: 38,
                height: 60,
                uri: UserData?.snoovatar_img
              }}
            />
          </TouchableOpacity>
  
          <View style={{
            marginLeft: "5%",
            marginTop: "5%"
          }}>
  
            <View>
              <Text>{UserData?.name}</Text>
            </View>
  
            <View>
              <Text>{UserData?.total_karma} Karma points</Text>
            </View>
  
            {/* <View>
              <Text>Description : {UserData.subreddit.public_description}</Text>
            </View> */}
          </View>
  
  
          <View style={{
            marginLeft: "59%",
            position: 'absolute'
          }}>
            <Button
              color="orange"
              title="Edit"
              onPress={() => console.log("button pressed")}
            />
          </View>
        </View>
  
  
        {/* <ScrollView >
          {UserActivity.length > 0 &&
          <CommentsManager comments={UserActivity} />}
        </ScrollView> */}
  
  
      </View>
    )
  } else {
    return (
      <View>
        <Text>Loading user data...</Text>
      </View>
    )
  }

  }

function UserPosts(props) {

  // console.log('props', props);
  // console.log('props.comments[0].data.body', props.comments[0].data.body);


  const commentsList = props.comments.map((item) => <Text>{item.data.body} {"\n"} </Text>)
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>
      {/* {props.comments[0].data.body} */}
      {commentsList}
      </Text>
      {/* <FlatList
        data={[props?.comments]}
        renderItem={({ item }) => <Text>{item.data?.body}</Text>}
      /> */}
      <SafeAreaView style={{ backgroundColor: "lightblue" }}>
        <Text>Hon hon hon, je suis ONE POST! </Text>
      </SafeAreaView>

      <SafeAreaView style={{ backgroundColor: "blue" }}>
        <Text style={styles.white}>Hon hon hon, je suis ONE POST! </Text>
      </SafeAreaView>

      <SafeAreaView style={{ backgroundColor: "darkblue" }}>
        <Text style={styles.red}>Hon hon hon, je suis ONE POST! </Text>
      </SafeAreaView>

    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  white: {
    color: 'white',
  },
});

export default UserProfile;