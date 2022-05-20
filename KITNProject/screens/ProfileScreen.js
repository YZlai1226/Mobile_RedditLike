import * as React from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import CommentsManager from '../components/CommentsManager';


function UserProfile() {
  const [UserData, setUserData] = React.useState([]);

  async function GetUserData() {
    console.log('Fetching user data', data);
    const data = await axios.get("https://oauth.reddit.com/api/v1/me", {
      headers: { 'Authorization': 'Bearer 9458804-gxDmVtNslA9TDbVYbv0mRm1A1I7xdw ' }
    })
    setUserData(data.data)
  }

  React.useEffect(() => {
    GetUserData()
  },
    []);

  const [UserActivity, setUserActivity] = React.useState([]);

  async function GetUserActivity() {
    let pseudo = UserData.name
    const UserA = await axios.get("https:/reddit.com/user/" + pseudo + ".json", {
      headers: { 'Authorization': 'Bearer 9458804-gxDmVtNslA9TDbVYbv0mRm1A1I7xdw ' }
    })
    setUserActivity(UserA.data.data.children)
    // console.log("++++++++++++++++++++++++++++++++++++++++++", UserActivity.data.data.children);
    console.log("////////////////////////", UserActivity);
  }

  React.useEffect(() => {
    GetUserActivity()
  },
    [UserData]);

    console.log('UserData', UserData);
    console.log('UserActivity', UserActivity);

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
              uri: UserData.snoovatar_img
            }}
          />
        </TouchableOpacity>

        <View style={{
          marginLeft: "5%",
          marginTop: "5%"
        }}>

          <View>
            <Text>{UserData.name}</Text>
          </View>

          <View>
            <Text>{UserData.total_karma} Karma points</Text>
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
            title="Edit your profile"
            onPress={() => console.log("button pressed")}
          />
        </View>
      </View>


      <ScrollView >
        {UserActivity.length > 0 &&
        <CommentsManager comments={UserActivity} />}
      </ScrollView>


    </View>
  )
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