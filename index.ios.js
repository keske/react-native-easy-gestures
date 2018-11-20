import React, { Component } from 'react';
import { AppRegistry, Image, View } from 'react-native';

import Gestures from './lib';

const photo = require('./static/photo.jpg');

export default class Example extends Component {
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
          ref={(c) => { this.gestures = c; }}
          onStart={(event, styles) => {
            // console.log('On Start');
          }}
          onChange={(event, styles) => {
            // console.log('On change');
          }}
          onEnd={(event, styles) => {
            // console.log('On End');
          }}
          onMultyTouchStart={(event, styles) => {
            // console.log('On MultyTouch Start');
          }}
          onMultyTouchChange={(event, styles) => {
            // console.log('On MultyTouch change');
          }}
          onMultyTouchEnd={(event, styles) => {
            // console.log('On MultyTouch End');
          }}
          onRotateStart={(event, styles) => {
            // console.log('On Rotate Start');
          }}
          onRotateChange={(event, styles) => {
            // console.log('On Rotate Change');
          }}
          onRotateEnd={(event, styles) => {
            // console.log('On Rotate End');
          }}
          onScaleStart={(event, styles) => {
            // console.log('On Scale Start');
          }}
          onScaleChange={(event, styles) => {
            // console.log('On Scale Change');
          }}
          onScaleEnd={(event, styles) => {
            // console.log('On Scale End');
          }}
          style={{
            left: 0,
            top: 0,
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

AppRegistry.registerComponent('GesturesExample', () => Example);
