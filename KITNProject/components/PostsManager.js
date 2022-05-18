import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import EachPost from './EachPost.js';

function PostsManager(props) {
    return (
        <>
            <Text>I am the posts Manager !!</Text>
            <EachPost navigation={props.navigation} />
        </>
    );
}
export default PostsManager;