# React Native Easy Gestures

React Native Gestures. Support: Drag, Scale and Rotate a Component.

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
    onChange={(styles) => {
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

### Style

Prop | Description | Type | Default
------ | ------ | ------ | ------
styles | React Native styles | Object | {}

### Callbacks

Prop | Description | Type
------ | ------ | ------
onChange(styles, event) | Get styles (left, top, rotate angle and scale) | Function
onRelease(event) | Callback when drag, rotate or scale is release | Function
onStart(event) | Callback when drag, rotate or scale is start | Function

# Development

```
$ git clone https://github.com/keske/react-native-easy-gestures.git
$ cd react-native-easy-gestures
$ npm install
$ react-native run-ios
```

MIT
