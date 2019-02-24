import React from 'react';
import renderer from 'react-test-renderer';
import HsvColorPicker from '../src';

describe('<HsvColorPicker />', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<HsvColorPicker />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
