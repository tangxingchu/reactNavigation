import React from 'react';
import {View, Text, Button, Animated, TouchableOpacity,} from 'react-native';

import GesturePassword from 'react-native-gesture-password';

const gPassword = '';

export default class Gpassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = {message: '绘制解锁密码', status: 'normal'};
	}

	onEnd = (password) => {
		if(gPassword === '') {
			gPassword = password;
			this.setState({
                status: 'normal',
                message: '再次绘制解锁密码'
            });
		} else {
			if (gPassword === password) {
                this.setState({
                    status: 'right',
					message: ''
                });
            } else {
                this.setState({
                    status: 'wrong',
                    message:  '两次密码不一致，请重试'
                });
            }
		}
	}

	render() {
		return (
			<GesturePassword
                ref='pg'
				interval={1000}
                status={this.state.status}
                message={this.state.message}
                onStart={this.onStart}
                onEnd={this.onEnd}
				onReset={this.onReset}
                />
		)
	}

}