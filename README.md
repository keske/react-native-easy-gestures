# React Native Easy Gestures

React Native Gestures. Support: Drag, Scale and Rotate a Component.

![example](https://raw.githubusercontent.com/keske/react-native-easy-gestures/master/static/gestures.gif)

## Usage

```
$ npm install --save react-native-easy-gestures
```

```javascript
import Gestures from 'react-native-easy-gestures';
...
render () {
  ...
  // Simple example
  <Gestures>
    <Image
      source={photo}
      style={{
        width: 200,
        height: 300,
      }}
    />
  </Gestures>
  ...
  // Only drag example
  <Gestures
    rotatable={false}
    scalable={false}
    onChange={(event, styles) => {
      console.log(styles);
    }}
    onRelease={() => {
      console.log('On Release');
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
  ...
}

```

## Props

### Behavior

Prop | Description | Type | Default
------ | ------ | ------ | ------
draggable | Should component drag | Boolean | `true`
rotatable | Should component rotate | Boolean | `true`
scalable | Should component scale | Boolean | `true`
minScale | Minimum value of scale | Number | `0.33`
maxScale | Maximum value of scale | Number | `2`

### Style

Prop | Description | Type | Default
------ | ------ | ------ | ------
styles | React Native styles | Object | {}

### Callbacks

Prop | Description | Type
------ | ------ | ------
onChange(event, styles) | Get component styles (top, left transform, etc) | Function
onRelease(event, styles) | Callback when drag, rotate or scale are finished | Function
onStart(event, styles) | Callback when drag, rotate or scale are started | Function

# Development

```
$ git clone https://github.com/keske/react-native-easy-gestures.git
$ cd react-native-easy-gestures
$ npm install
$ react-native run-ios
```

# License

```
MIT License

Copyright (c) 2017 Andrey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
