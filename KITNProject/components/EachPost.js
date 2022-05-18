import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

function EachPost(props) {
    return (
        <>
            <Text>I am Each post !!</Text>
            <Button
                title="Go to SubredditPage"
                onPress={() => props.navigation.navigate('SubredditScreen')}
            />
            <Button
                title="Go to PostPage"
                onPress={() => props.navigation.navigate('PostScreen')}
            />
        </>
    );
}
export default EachPost;