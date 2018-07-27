import React from 'react';
import { AppRegistry, Image, View } from 'react-native';

import Gestures from './lib/';

const photo = require('./static/photo.jpg');

const example = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Gestures
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
    >
      <Image
        source={photo}
        style={{
          width: 300,
          height: 400,
        }}
      />
    </Gestures>

    <Gestures draggable={true} scalable={true} rotatable={true} onRelease={(event, styles) => { console.log(styles); }} > <Image source={photo} style={{ width: 200, height: 200, resizeMode: "contain" }} /> </Gestures>


  </View>
);

AppRegistry.registerComponent('GesturesExample', () => example);
