import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { TabNavigator } from "react-navigation";
import BaiduMap from './BaiduMap';

class RecentChatsScreen extends React.Component {

	

  render() {
	const { navigate } = this.props.navigation;
    return <View>
			<Text>Hello, Navigation!</Text>
			<Button
			  onPress={() => navigate('Chat', { user: 'Lucy123' })}
			  title="Chat with Lucy"
			/>
			<View style={{marginTop: 16}}>
			<Button
			  onPress={() => navigate('GesturePassword', { user: 'Lucy123' })}
			  title="手势密码"
			/>
			</View>
			<View style={{marginTop: 16}}>
			<Button
			  onPress={() => navigate('DocViewer', { user: 'Lucy123' })}
			  title="DocViewer"
			/>
			</View>
		</View>
  }
}

class AllContactsScreen extends React.Component {
  render() {
	const { navigate } = this.props.navigation;
    return (<View>
			<Text>List of all contacts</Text>
			<Button
			  onPress={() => navigate('City', { user: 'Lucy123' })}
			  title="City"
			/>
		</View>)
  }
}

class ThirdScreen extends React.Component {
  render() {
	const { navigate } = this.props.navigation;
    return <View>
		<Text>我是坚强猪</Text>
			<Button
			  onPress={() => navigate('FlatListCity', { user: 'Lucy123' })}
			  title="FlatListCity"
			/>
		</View>
  }
}



const MainScreenNavigator = TabNavigator({
  '最近': { screen: RecentChatsScreen },
  '所有': { screen: AllContactsScreen },
  '中心': { screen: ()=><View/> },
  '坚猪' : { screen: ThirdScreen },
  '地图' : { screen: BaiduMap },
},
{tabBarOptions: {
	activeTintColor: '#e91e63',
    indicatorStyle: {
		backgroundColor: 'transparent',
	},
  },
 tabBarPosition: 'bottom',
 backBehavior: 'none',
 swipeEnabled: false,
});

MainScreenNavigator.navigationOptions = {
  title: 'ReactNavigation测试',
};

export default MainScreenNavigator;