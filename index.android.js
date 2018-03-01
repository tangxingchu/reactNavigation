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
import Fingerprint from './js/Fingerprint'
import ExternalURL from './js/ExternalURL'
import BottomSheetBehaviorScreen from './js/BottomSheetBehaviorScreen'

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
			<View style={{position: 'absolute', bottom: 0, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width}}>
				<TouchableNativeFeedback onPress={()=>{this.setState({show: !this.state.show})}}><Image source={{uri: 'add_card', width: 60, height: 60}} style={{zIndex: 99}}/></TouchableNativeFeedback>
			</View>
	  {this.state.show ?   
			<View style={{flex: 1, backgroundColor: '#ccc', opacity: 0.4, bottom: 0, top: 0, position: 'absolute', zIndex: 98, width: Dimensions.get('window').width}}>
				<Text>faaaaaa</Text>
			</View>
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
  City : { screen: City, navigationOptions: ({navigation}) => ({
	  title: '城市列表',
	  //header: <Text>城市列表</Text>,
	  headerTitleStyle: {
		color: '#000',
		alignSelf: 'center',
	  }
    }),
  }, 
  FlatListCity: { screen: FlatListCity},
  GesturePassword: { screen: GesturePassword, 
	  navigationOptions: ({navigation}) => ({
	  header: null,
    }),
  },
  DocViewer: { screen: DocViewer},
  Fingerprint: { screen: Fingerprint},
  ExternalURL: { screen: ExternalURL},
  BottomSheetBehaviorScreen: { screen: BottomSheetBehaviorScreen},
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
