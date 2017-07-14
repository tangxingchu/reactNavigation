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
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
  '坚强猪' : { screen: ThirdScreen },
  '百度地图' : { screen: BaiduMap },
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