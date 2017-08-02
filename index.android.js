import React from 'react';
import {
  View,
  AppRegistry,
  Text,
  Button,
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import ChatScreen from './js/ChatScreen';
import TabNavigatorScreen from './js/TabNavigatorScreen';
import City from './js/City';
import FlatListCity from './js/FlatListCity';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
	  const { navigate } = this.props.navigation;
    return <View>
			<Text>Hello, Navigation!</Text>
			<Button
			  onPress={() => navigate('Chat', { user: 'Lucy123' })}
			  title="Chat with Lucy"
			/>
		</View>
  }
}



const SimpleApp = StackNavigator({
  Home: { screen: TabNavigatorScreen },
  Chat: { screen: ChatScreen , 
	  navigationOptions: ({navigation}) => ({
	  header: null,
    }),
  },
  City : { screen: City }, 
  FlatListCity: { screen: FlatListCity},
});

const MyApp = DrawerNavigator({
  Home: {
    screen: SimpleApp,
  },
  Notifications: {
    screen: HomeScreen,
  },
}, {
	drawerWidth: 300,
	drawerPosition: 'right',
	//contentComponent: props => <View><Text>aaaaabbbccccss</Text></View>,
	backBehavior: 'none',
});

AppRegistry.registerComponent('reactNavigation', () => MyApp);
