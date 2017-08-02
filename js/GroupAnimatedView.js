import React, {Component} from 'react';

import {Animated, PanResponder} from 'react-native';

export default class GroupAnimatedView extends Component {

	constructor(props) {
		super(props);
		this.x = 0;
		this.y = 0;
		this.state = {
			x: this.x,
			y: this.y,
			backgroundColor: 'red',
			pan: new Animated.ValueXY(),
			
		};
	}
	
	componentWillMount() {
		/*
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd,
		});*/

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: Animated.event(
				[null, {dx: this.state.pan.x, dy:this.state.pan.y}] // 绑定动画值
			),
			onPanResponderRelease: this._handlePanResponderEnd2,
			onPanResponderTerminate: this._handlePanResponderEnd2,
		});
	}

	_handleStartShouldSetPanResponder = (e: Object, gestureState: Object) => {
		// Should we become active when the user presses down on the circle?
		return true;
	}

	_handleMoveShouldSetPanResponder = (e: Object, gestureState: Object) => {
		return true;
	}

	_handlePanResponderGrant = (e: Object, gestureState: Object) => {
		this.setState({
			'backgroundColor': 'blue',
		});
	}

	_handlePanResponderMove = (e: Object, gestureState: Object) => {
		this.setState({
			'x': this.x + gestureState.dx,
			'y': this.y + gestureState.dy,
		});
	}

	_handlePanResponderEnd = (e: Object, gestureState: Object) => {
		this.setState({
			'backgroundColor': 'red',
		});
		this.x += gestureState.dx;
		this.y += gestureState.dy;
	}

	_handlePanResponderEnd2 = (e: Object, gestureState: Object) => {
		Animated.spring(this.state.pan,{toValue: {x: 0, y: 0}, }).start();
		this.setState({
			'backgroundColor': 'red',
		});
	}

	componentDidMount() {
		/*Animated.sequence(
			
		).start();
		*/

	}
	
	render() {
		return (
			<Animated.View style={{...this.props.style, backgroundColor: this.state.backgroundColor,borderRadius:50, position: 'absolute', top: this.state.y, left: this.state.x, 
				transform: [{translateX: this.state.pan.x},{translateY: this.state.pan.y}] }}
				{...this._panResponder.panHandlers}>
				{this.props.children}
			</Animated.View>
		)
	}

}