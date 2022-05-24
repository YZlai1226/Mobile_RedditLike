import * as React from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityManager from '../components/ActivityManager';

function UserProfile() {
  const [token, setToken] = React.useState('');
  const [UserData, setUserData] = React.useState([]);
  const [UserActivity, setUserActivity] = React.useState([]);

  async function retrieveToken() {
    try {
      const retrievedToken = await AsyncStorage.getItem('@access_token');
      setToken(retrievedToken);
      const res = await axios.get("https://oauth.reddit.com/api/v1/me.json", {
        headers: {
          'User-Agent': 'android:kitnforreddit:0.3',
          Authorization: 'Bearer ' + retrievedToken
        }
      })
      setUserData(res.data)
    } catch {
      console.log('error');
    }
  }
  async function GetUserData() {
    try {
      console.log('token:', token);
      const res = await axios.get("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: 'Bearer ' + token,
          'User-Agent': 'android:kitnforreddit:0.3'
        }
      })
      console.log('res.data:', res.data);
      setUserData(res.data)
    } catch {
      console.log('data fetching failed');
    }
  }
  async function GetUserActivity() {
    if (UserData !== []) {
      try {
        const res = await axios.get("https://oauth.reddit.com/user/" + UserData.name + ".json", {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        setUserActivity(res.data.data.children)

        console.log("Post Author!!!!", res.data.data.children[0].data.link_author);
// 
        console.log("Post TITLE!!!", res.data.data.children[0].data.link_title);
        // console.log("++++++++++++++++++++++++++++++++++++++++++", UserActivity.data.data.children);
        // console.log("////////////////////////", UserActivity);
      } catch {
        console.log('User activity fetching failed');
      }
    }
  }
  async function logout() {
    try {
      await AsyncStorage.removeItem('@access_storage');
      await AsyncStorage.setItem('@is_logged', 'false')
    } catch (exception) {
      console.log(exception);
    }
  }

  React.useEffect(() => { retrieveToken() }, []);

  // React.useEffect(() => { GetUserData() }, [token]);

  React.useEffect(() => { GetUserActivity() }, [UserData]);

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
            marginTop: "2%"
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
            marginTop: "2%",
            position: 'absolute'
          }}>
            <Button 
              color="orange"
              title="logout"
              onPress={() => logout()}
            />
          </View>
        </View>

        <ScrollView >
          {UserActivity?.length > 0 &&
            <ActivityManager comments={UserActivity} />}
        </ScrollView>

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