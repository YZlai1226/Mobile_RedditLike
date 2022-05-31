import React, { useEffect, useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import axios from 'axios';
import qs from 'qs';

// STYLE
import * as eva from '@eva-design/eva';
import { default as theme } from './../theme.json';
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import Context from './../context.js';

export default function LoginScreen() {

  const context = useContext(Context);

  WebBrowser.maybeCompleteAuthSession();

  const base64 = require('base-64');

  //Endpoint
  const discovery = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  };
  const clientId = '42EUJ0kpJkr4HpsTFeMtRA'
  const redirectUri = 'exp://10.41.97.206:19001'


  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      scopes: ['*'],
      redirectUri: redirectUri
    },
    discovery
  );

  useEffect(() => {
    async function getToken(code) {
      const url = "https://www.reddit.com/api/v1/access_token";
      const res = await axios({
        method: 'post',
        url: url,
        data: qs.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic NDJFVUowa3BKa3I0SHBzVEZlTXRSQTo=',
        }
      });
      if (res.data.access_token) {
        await AsyncStorage.setItem('@access_token', res.data.access_token);
        context.setIsLoggedIn(true);
        context.setAccessToken(res.data.access_token);
      }
    };
    if (response?.type === 'success') {
      const code = response.params.code;
      getToken(code);
    }
  }, [response]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          rowGap: 20,
          padding: 30,
          alignItems: 'flex-end',
        }}>

        <Button>
          Register
        </Button>

        <Button
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          style={{ marginBottom: 20 }}
        >
          Login
        </Button>

        <Text>
          The reddit client that will make you purr.
        </Text>

        <Text style={{
          textAlign: 'right',

          fontSize: 50,
        }}>
          Welcome to KITN.
        </Text>

        <View>

        </View>
      </Layout>
    </ApplicationProvider>
  )
}