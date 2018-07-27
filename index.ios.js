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
      draggable={{ x: true, y: true }}
      scalable={{ min: 0.1, max: 200 }}
      rotatable={true}
      onRelease={(event, styles) => { console.log(styles); }}
    >
      <Image
        source={photo}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
        />
      </Gestures>


  </View>
);

AppRegistry.registerComponent('GesturesExample', () => example);
