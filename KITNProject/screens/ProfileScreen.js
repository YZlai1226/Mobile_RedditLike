import * as React from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios';


function UserProfile() {
  console.log("object");
  const [UserData, setUserData] = React.useState([]);

  async function GetUserData() {
    const data = await axios.get("https://oauth.reddit.com/api/v1/me", {
      headers: { 'Authorization': 'Bearer 1825370484862-mXj10P1oQPhzO8HqNymlmko6KcrxPw' }
    })
    console.log("Subreddit", UserData);
    console.log("description", UserData.subreddit.description);
    setUserData(data.data)
  }

  React.useEffect(() => {
    GetUserData()
  },
    []);

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%",
        // backgroundColor: "darkorange"
      }}>

        <TouchableOpacity onPress={() => console.log("image pressed")}>
          <Image
            source={{
              width: 80,
              height: 80,
              uri: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png"
            }}
          />
        </TouchableOpacity>

        <View style={{
          marginLeft: "5%",
          marginTop: "10%"
        }}>
          <View>
            <Text>Username :</Text>
            <TextInput
              style={{
                height: 25,
                borderColor: 'gray',
                borderWidth: 1
              }}
              defaultValue={"UserData.name"}
            />
          </View>

          <View>
            <Text>description : </Text>
            <TextInput
              style={{
                height: 25,
                borderColor: 'gray',
                borderWidth: 1
              }}
              defaultValue={"UserData.subreddit.description"}
            />
          </View>

          <View>
            <Text>about me</Text>
            <TextInput
              style={{
                height: 50,
                borderColor: 'gray',
                borderWidth: 1
              }}
              defaultValue="I love pizza!"
            />

            <View style={{
              flexDirection: 'row',
            }}>
              <Text>Trophy Case : </Text>

              <Image
                source={{
                  width: 50,
                  height: 51,
                  uri: "https:/picsum.photos/50/51"
                }}
              />
              <Image
                source={{
                  width: 51,
                  height: 50,
                  uri: "https:/picsum.photos/51/50"
                }}
              />
              <Image
                source={{
                  width: 50,
                  height: 50,
                  uri: "https:/picsum.photos/50/50"
                }}
              />
            </View>


          </View>
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


      <View >
        <UserPosts />
      </View>
    </View>
  )
}

function UserPosts() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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