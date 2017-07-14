import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, FlatList, View, RefreshControl} from 'react-native';

const cities = require('../allcities.json');


export default class FlatListCity extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: cities,
		};
	}

	_keyExtractor = (item, index) => item.Id;

	_renderItem = ({item}) => {
		return (
			<View style={{flex:1, borderBottomWidth: 1, borderColor: '#ccc'}}>
				<TouchableOpacity>
					<View style={{flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
						<View>
							<Image source={{uri:'ic_launcher'}} style={{width: 72, height: 72}}/>
						</View>
						<View style={{alignItems: 'center', flex: 1, flexDirection:'row'}}><Text>{item.Name}</Text></View>
					</View>
				</TouchableOpacity>
				<View style={{flex:1,flexDirection:'row', justifyContent:'flex-start', paddingLeft: 8}}><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text><Text>{item.Name}</Text></View>
			</View>
		);
	}
	
	_renderRefreshControl() {
		let {refreshing, tintColor, title, colors, progressBackgroundColor} = this.state;
		return (
			<RefreshControl
				refreshing={false}
				tintColor={tintColor}
				title={title}
				colors={colors}
				progressBackgroundColor={progressBackgroundColor}
			  />	
		)
	}

	render() {
		return (
			<FlatList
				data={this.state.dataSource}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
				refreshControl = {this._renderRefreshControl()}>	
			</FlatList>
		)
	}
}

FlatListCity.propTypes = {
    value: React.PropTypes.string
};
