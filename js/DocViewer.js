import React from 'react';
import {View, Text, Button, Animated, TouchableNativeFeedback} from 'react-native';

import OpenFile from 'react-native-doc-viewer';
const RNFS = require('react-native-fs');

export default class DocViewer extends React.Component {

	constructor(props) {
		super(props);
	}

	handlePress = () => {
		OpenFile.openDoc([{
			url:"http://www.snee.com/xml/xslt/sample.doc",
			fileName:"sample"
		}], (error, url) => {
			if (error) {
				console.error(error);
			} else {
				console.log(url)
			}
		})
	}
	
	render() {
		return (<View style={{flex: 1}}>
			<TouchableNativeFeedback onPress={this.handlePress}>
				<Text>doc</Text>
			</TouchableNativeFeedback>
		</View>)
	}

}