import React from 'react';
import { mount } from 'enzyme';
import HsvColorPicker from '../src';

describe('<HsvColorPicker />', () => {
  test('renders correctly', () => {
    const wrapper = mount(<HsvColorPicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
