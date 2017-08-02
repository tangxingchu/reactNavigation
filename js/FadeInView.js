import React, {Component} from 'react';

import {Animated, Easing} from 'react-native';

export default class FadeInView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
			xPosition: new Animated.Value(50),
			rotateZ: new Animated.Value(0),
			scale: new Animated.Value(0.3),
		};
	}

	componentDidMount() {
		var timing = Animated.timing;
		Animated.sequence([
			timing(this.state.fadeAnim, {
				toValue: 1,
				duration: 2000,
			}),
			Animated.delay(400),//延期400ms,在执行
			Animated.parallel([
				Animated.decay(this.state.xPosition, {
					toValue: 300,
					velocity: 0.5,
					easing: Easing.exp,
				}),
				timing(this.state.rotateZ, {
					toValue: 1,
					duration: 3000,
					easing: Easing.linear,
				}),
			]),			
		]).start();
		this.spring();		
	}

	spring = () => {
		this.state.scale.setValue(0.3);
		Animated.spring(this.state.scale, {
			toValue: 1,
			friction: 1,
		}).start(() => this.spring());
	}
	
	render() {
		return (
			<Animated.View style={{...this.props.style, opacity: this.state.fadeAnim, bottom: this.state.xPosition, transform: [{
					rotateZ: this.state.rotateZ.interpolate({
						inputRange: [0, 1],
						outputRange: ['0deg', '360deg'],
					})
				},{
					scale: this.state.scale.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
					}),
				}]
			}}>
				{this.props.children}
			</Animated.View>
		)
	}

}