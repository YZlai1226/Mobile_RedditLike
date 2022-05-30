import { Button } from 'react-native';
import { ButtonGroup } from '@ui-kitten/components';


function Filters(props) {
  return (
    <ButtonGroup>
      <Button
        onPress={() => props.setFilter('new')}
        title="New"
        appearance='ghost'
        status='basic'
      />

      <Button
        onPress={() => props.setFilter('best')}
        title="Best"
        appearance='ghost'
        status='basic'
      />

      <Button
        onPress={() => props.setFilter('top')}
        title="Top"
        appearance='ghost'
        status='basic'
      />

      <Button
        onPress={() => props.setFilter('controversial')}
        title="Controversial"
        appearance='ghost'
        status='basic'
      />

      <Button
        onPress={() => props.setFilter('rising')}
        title="Rising"
        appearance='ghost'
        status='basic'
      />
    </ButtonGroup>
  )
}

export default Filters;