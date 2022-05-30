import { View, Button } from 'react-native';
import { Input } from '@ui-kitten/components';


function SearchBar(props) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', width: '100%', paddingTop: 10, paddingLeft: 10 }}>
      <Input
        placeholder='Search'
        value={props.query}
        onChangeText={nextQuery => props.setQuery(nextQuery)}
        status='basic'
        style={{ width: '85%', zIndex: 2 }}
      />

      <Button
        onPress={() => props.search()}
        title="Go"
      />
    </View>
  )
}

export default SearchBar;