import { FlatList } from 'react-native-gesture-handler';
import EachPost from './EachPost.js';

function PostsManager(props) {

  return (
    <>
      {props.posts.length > 0 &&
        <FlatList
          data={props.posts}
          renderItem={({item}) => (
            <EachPost key={item.data.id} post={item} token={props.token} >item is {item.data.id}</EachPost>
          )}
          keyExtractor={post => post.id}
        />
      }
    </>
  );
}
export default PostsManager;

