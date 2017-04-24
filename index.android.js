/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  View,
} from 'react-native';

// Component
import Gestures from './lib/';

// Photo
const photo = require('./static/photo.jpg');

export default class GesturesExample extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Gestures
          onStart={() => {
            console.log('Start');
          }}
          onChange={(styles) => {
            console.log('Change');
            console.log(styles);
          }}
          onRelease={() => {
            console.log('Release');
          }}
        >
          <Image
            source={photo}
            style={{
              width: 200,
              height: 300,
            }}
          />
        </Gestures>
      </View>
    );
  }
}

AppRegistry.registerComponent('GesturesExample', () => GesturesExample);
