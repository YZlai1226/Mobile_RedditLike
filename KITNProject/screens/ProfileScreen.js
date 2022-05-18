import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

function UserProfile() {
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
              uri: "https:/picsum.photos/80/80"
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
              defaultValue="Username!"
            />
          </View>
          <View>
            <Text>e-mail : </Text>
            <TextInput
              style={{
                height: 25,
                borderColor: 'gray',
                borderWidth: 1
              }}
              defaultValue="toto@toto.fr"
            />
          </View>
          <View>
            <Text>Gender</Text>
            <TextInput
              style={{
                height: 25,
                borderColor: 'gray',
                borderWidth: 1
              }}
              defaultValue="M"
            />
          </View>
          <View>
            <Text>about me</Text>
            <TextInput
              style={{
                height: 50,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1
              }}
              defaultValue="I love pizza!"
            />

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