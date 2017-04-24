/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  View,
} from 'react-native';

// Component
import Gestures from './lib/';

// Photo
const photo = require('./static/photo.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class GesturesExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Gestures>
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
