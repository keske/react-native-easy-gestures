/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Gestures from './lib';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Dimensions
} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import photo from './static/photo.jpg'

const App: () => Node = () => {

  return (
      <View style={{left: 0, top: 0, transform: [{ rotate: '0deg' }, { scale: 1 }]}}>
        <Gestures
          scalable={{
            min: 0.1,
            max: 7,
          }}
          rotatable
          onEnd={(event, styles) => {
            console.log(styles);
          }}
        >
          <Image
            source={photo}
            style={{
              width,
              height,
            }}
          />
        </Gestures>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
