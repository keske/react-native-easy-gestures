# React Native Easy Gestures

React Native Gestures. Support: Drag, Scale and Rotate a Component.

## Table of contents

1. [Usage](#usage)

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
  <Gestures
    onChange={(styles) => {
      console.log(styles);
    }}
  >
    <View />
  </Gestures>
  ...
}

```

## Props

### Behavior

Prop | Description | Type | Default
------ | ------ | ------ | ------
drag | Should component draggable | Boolean | `true`
rotate | Should component rotate | Boolean | `true`
scale | Should component scale | Boolean | `true`

### Style

Prop | Description | Type | Default
------ | ------ | ------ | ------
left | Left | Number | `0`
top | Top | Number | `0`
rotate | Transform rotate | Number | `0`
scale | Transform scale | Number | `1`

### Callbacks

Prop | Description | Type | Default
------ | ------ | ------ | ------
onChange(styles) | Get styles (left, top, rotate angle and scale) | Function | `undefined`
onRelease() | Callback when drag, rotate or scale is release | Function | `undefined`
