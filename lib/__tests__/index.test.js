import { Text } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Gestures from '../';

it('renders correctly', () => {
  const gestures = renderer.create(
    <Gestures>
      <Text>Something to display would go here</Text>
    </Gestures>
  );
  expect(gestures).toMatchSnapshot();
});

it('renders at the scale of the prop', () => {
  const gestures = renderer.create(
    <Gestures scale={42}>
      <Text>Something to display would go here</Text>
    </Gestures>
  );
  expect(gestures).toMatchSnapshot();
});

it('renders with the rotation defined by the prop', () => {
  const gestures = renderer.create(
    <Gestures rotate="42deg">
      <Text>Something to display would go here</Text>
    </Gestures>
  );
  expect(gestures).toMatchSnapshot();
});
