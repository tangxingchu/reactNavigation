import React, { Component } from 'react';
import {View, StyleSheet, WebView, Animated, Dimensions, Easing} from 'react-native';

export default class ExternalURL extends Component {

    constructor(props) {
        super(props);
		this.state = {
			width: new Animated.Value(0),
			visible: true,
		}
    }

    componentDidMount() {
        
    }
	
	_onStart = () => {
		let toValue = Dimensions.get('window').width - 100;
		Animated.timing(this.state.width, {
			toValue: toValue,
			duration: 1500,
			easing: Easing.exp,
		}).start();
	}

	_onEnd = () => {
		let toValue = Dimensions.get('window').width;
		Animated.timing(this.state.width, {
			toValue: toValue,
			duration: 500,
			easing: Easing.exp,
		}).start(() => {
			this.setState({visible: false});
		});
	}

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
			{ this.state.visible ? <Animated.View style={{height: 2, width: this.state.width, backgroundColor: '#108ee9',}}></Animated.View> : null }
                <View style={{flex: 1}}>
                    <WebView 
						source={{uri: 'https://www.baidu.com'}}
						onLoadEnd={this._onEnd}
						onLoadStart={this._onStart}
					/>
                </View>
            </View>
        )
    }

}