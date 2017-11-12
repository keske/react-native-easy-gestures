/**
 * React Native Easy Gestures Example
 * https://github.com/keske/react-native-easy-gestures
 *
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Image, View } from 'react-native';

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
          onStart={(event, styles) => {
            console.log('Start');
            console.log(styles);
          }}
          onChange={(event, styles) => {
            console.log('Change');
            console.log(styles);
          }}
          onRelease={(event, styles) => {
            console.log('Release');
            console.log(styles);
          }}
        >
          <Image
            source={photo}
            style={{
              width: 300,
              height: 400,
            }}
          />
        </Gestures>
      </View>
    );
  }
}

AppRegistry.registerComponent('GesturesExample', () => GesturesExample);
