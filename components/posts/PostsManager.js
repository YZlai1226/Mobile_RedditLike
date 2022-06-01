import { FlatList } from 'react-native-gesture-handler';
import EachPost from './EachPost.js';
import { View } from 'react-native';

function PostsManager(props) {

  return (
    <>
      {props.posts.length > 0 &&
        <FlatList
          keyExtractor={(post, index) => index.toString()}
          data={props.posts}
          renderItem={({ item }) => (
            <EachPost key={item.data.id} post={item} token={props.token} >item is {item.data.id}</EachPost>
          )}
          // keyExtractor={post => post.id}
          // keyExtractor={(post, index) => {
          //   return post.id;
          // }}
        />
      }
    </>
  );
}
export default PostsManager;