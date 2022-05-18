import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
export default LoginScreen;