import React from 'react';
import {
  View,
  Text,
  Button,
  Animated,
  TouchableOpacity,
} from 'react-native';
import FadeInView from './FadeInView';
import GroupAnimatedView from './GroupAnimatedView';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
		title: `Chat with ${navigation.state.params.user}`,
		headerRight: <Button title="Info" onPress={()=>{}}/>,
  })
	
	constructor(props) {
		super(props);
		this.state = {movies: []};
	}

	_fetch = () => {
		fetch('https://facebook.github.io/react-native/movies.json', 
			{method: 'GET'}
		).then(response => response.json()).then((data) => this.setState({movies: data.movies})).catch(err => console.log(err));
	}

  //组合动画
  render() {
    return (
      <View style={{flex: 1}}>
		<GroupAnimatedView style={{width: 100, height: 100, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', zIndex: 99, elevation: 30}}>
			<Text>Chat with Lucy</Text>
			<Text>一共:{this.state.movies.length}</Text>
		</GroupAnimatedView>
		<FadeInView style={{position: 'absolute',bottom: 50,right: 50, height: 50, backgroundColor: 'powderblue'}}>
			<TouchableOpacity onPress={this._fetch}>
				<Text>猪头三1</Text>
			</TouchableOpacity>
		</FadeInView>
      </View>
    );
  }
}