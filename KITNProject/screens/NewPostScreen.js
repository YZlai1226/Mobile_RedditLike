import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
// import axios from 'axios';

import { Text, Input } from '@ui-kitten/components';

function NewPostScreen(props) {
  const ad = false;
  const sr = props.route.params.subId;
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // async function submitPost() {
  //   const res = await axios.post('https://oauth.reddit.com//api/submit')
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Submit a post to {props.route.params.subId}
        </Text>

        <Input
          placeholder='Title'
          value={title}
          onChangeText={nextTitle => setTitle(nextTitle)}
        />

        <Input
          placeholder='Url'
          value={url}
          onChangeText={nextUrl => setUrl(nextUrl)}
        />

      </View>
    </ScrollView>
  );
}
export default NewPostScreen;