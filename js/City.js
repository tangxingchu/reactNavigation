import React, {Component} from 'react';
import {Navigator, Text, TouchableOpacity, Image, ListView, View, RefreshControl, Dimensions} from 'react-native';

const cities = require('../allcities.json');


export default class City extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(cities),
		};
	}

	componetDidMount() {
		
	}

	_renderRow(rowData) {
		return (
			<View style={{flex:1, borderBottomWidth: 1, borderColor: '#ccc'}}>
				<TouchableOpacity>
					<View style={{flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
						<View>
							<Image source={{uri:'ic_launcher'}} style={{width: 72, height: 72}}/>
						</View>
						<View style={{alignItems: 'center', flex: 1, flexDirection:'row'}}><Text>{rowData.Name}</Text></View>
					</View>
				</TouchableOpacity>
				<View style={{flex:1,flexDirection:'row', justifyContent:'flex-start', paddingLeft: 8}}><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text><Text>{rowData.Name}</Text></View>
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
			<View style={{flex: 1}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow}
					refreshControl = {this._renderRefreshControl()}>	
				</ListView>
				<View style={{position: 'absolute',bottom: 50,right: 50}}>
					<Text>猪头三</Text>
				</View>
			</View>
		)
	}
}

City.propTypes = {
    value: React.PropTypes.string
};
