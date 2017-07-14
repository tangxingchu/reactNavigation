import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
		title: `Chat with ${navigation.state.params.user}`,
		headerRight: <Button title="Info" onPress={()=>{}}/>,
  })
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Chat with Lucy</Text>
		<View style={{position: 'absolute',bottom: 50,right: 50}}>
			<Text>猪头三</Text>
		</View>
      </View>
    );
  }
}