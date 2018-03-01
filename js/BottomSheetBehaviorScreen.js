import React, { Component } from 'react';
import {View, StyleSheet, WebView, Animated, Dimensions, Easing, Text} from 'react-native';

import {CoordinatorLayout, BottomSheetBehavior, FloatingActionButton} from 'react-native-bottom-sheet-behavior';

export default class BottomSheetBehaviorScreen extends Component {

    render() {
        return (
            <CoordinatorLayout style={{flex: 1}}>
              <View style={{ flex: 1, backgroundColor: 'transparent' }}></View>
              <BottomSheetBehavior
                ref='bottomSheet'
                peekHeight={70}
                hideable={false}
                state={BottomSheetBehavior.STATE_COLLAPSED}>
                <View style={{backgroundColor: '#4389f2'}}>
                  <View style={{padding: 26}}>
                    <Text>BottomSheetBehavior!</Text>
                  </View>
                  <View style={{height: 200, backgroundColor: '#fff'}} />
                </View>
              </BottomSheetBehavior>
              <FloatingActionButton autoAnchor ref="fab" />
            </CoordinatorLayout>
        )
      }

}