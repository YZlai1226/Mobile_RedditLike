import React, { useState, useEffect, useContext } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityManager from '../components/activities/ActivitiesManager';
import { useNavigation } from '@react-navigation/native';
import Context from '../context';
import { Layout, Text } from '@ui-kitten/components';

function UserProfile() {
  const [token, setToken] = useState('');
  const [UserData, setUserData] = useState([]);
  const [UserActivity, setUserActivity] = useState([]);
  const navigation = useNavigation();

  const context = useContext(Context);  

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
      const res = await axios.get("https://oauth.reddit.com/api/v1/me", {
        headers: {
          Authorization: 'Bearer ' + token,
          'User-Agent': 'android:kitnforreddit:0.3'
        }
      })
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
      } catch {
        console.log('User activity fetching failed');
      }
    }
  }
  async function logout() {
    try {
      await AsyncStorage.removeItem('@access_storage');
      await AsyncStorage.setItem('@is_logged', 'false')
      context.setIsLoggedIn(false);
      context.setAccessToken('');
    } catch (exception) {
      console.log(exception);
    }
  }

  useEffect(() => { retrieveToken() }, []);

  // React.useEffect(() => { GetUserData() }, [token]);

  useEffect(() => { GetUserActivity() }, [UserData]);

  if (UserData) {
    return (
      <Layout>
        <View style={{
          flexDirection: 'row',
          marginTop: "5%",
          marginLeft: "5%",
          marginRight: "5%",

        }}>

          <TouchableOpacity >
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
              onPress={() => { logout(); navigation.navigate('Home') }}
            />
          </View>
        </View>

        <ScrollView >
          {UserActivity?.length > 0 &&
            <ActivityManager comments={UserActivity} />}
        </ScrollView>

      </Layout>
    )
  } else {
    return (
      <View>
        <Text>Loading user data...</Text>
      </View>
    )
  }
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