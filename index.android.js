import React from 'react';
import {
  View,
  AppRegistry,
  Text,
  Button,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import ChatScreen from './js/ChatScreen';
import TabNavigatorScreen from './js/TabNavigatorScreen';
import City from './js/City';
import FlatListCity from './js/FlatListCity';
import GesturePassword from './js/GesturePassword'
import DocViewer from './js/DocViewer'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
	  const { navigate } = this.props.navigation;
    return <View>
			<Text>Hello, Navigation!</Text>
			<Button
			  onPress={() => navigate('FlatListCity', { user: 'Lucy123' })}
			  title="FlatListCity"
			/>
		</View>
  }
}

class WarpperTabNavigatorScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

  render() {
    return (
		<View style={{flex: 1}}>
			<TabNavigatorScreen navigation={this.props.navigation}/>
			<View style={{position: 'absolute', bottom: 0, zIndex: 99, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width}}>
				<TouchableNativeFeedback onPress={()=>{this.setState({show: !this.state.show})}}><Image source={{uri: 'add_card', width: 60, height: 60}}/></TouchableNativeFeedback>
			</View>
	  {this.state.show ?   
			<View style={{flex: 1, backgroundColor: 'red', position: 'absolute', zIndex: 98, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}></View>
		: null}
		</View>
	)
  }
}
WarpperTabNavigatorScreen.router = TabNavigatorScreen.router;
WarpperTabNavigatorScreen.navigationOptions = TabNavigatorScreen.navigationOptions;

const SimpleApp = StackNavigator({
  Home: { screen: WarpperTabNavigatorScreen },
  Chat: { screen: ChatScreen , 
	  navigationOptions: ({navigation}) => ({
	  header: null,
    }),
  },
  City : { screen: City }, 
  FlatListCity: { screen: FlatListCity},
  GesturePassword: { screen: GesturePassword, 
	  navigationOptions: ({navigation}) => ({
	  header: null,
    }),
  },
  DocViewer: { screen: DocViewer},
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
	drawerPosition: 'left',
	//contentComponent: props => <View><Text>aaaaabbbccccss</Text></View>,
	//backBehavior: 'none',
});

AppRegistry.registerComponent('reactNavigation', () => MyApp);
