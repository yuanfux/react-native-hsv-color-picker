import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import HuePicker from './HuePicker';
import SaturationValuePicker from './SaturationValuePicker';

export default class HsvColorPicker extends Component {
  constructor(props) {
    super(props);
    this.satValPicker = React.createRef();
  }

  getCurrentColor() {
    return this.satValPicker.current.getCurrentColor();
  }

  render() {
    const {
      containerStyle,
      huePickerContainerStyle,
      huePickerBorderRadius,
      huePickerHue,
      huePickerBarWidth,
      huePickerBarHeight,
      huePickerSliderSize,
      onHuePickerDragStart,
      onHuePickerDragMove,
      onHuePickerDragEnd,
      onHuePickerDragTerminate,
      onHuePickerPress,
      satValPickerContainerStyle,
      satValPickerBorderRadius,
      satValPickerSize,
      satValPickerSliderSize,
      satValPickerHue,
      satValPickerSaturation,
      satValPickerValue,
      onSatValPickerDragStart,
      onSatValPickerDragMove,
      onSatValPickerDragEnd,
      onSatValPickerDragTerminate,
      onSatValPickerPress,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <SaturationValuePicker
          containerStyle={satValPickerContainerStyle}
          borderRadius={satValPickerBorderRadius}
          size={satValPickerSize}
          sliderSize={satValPickerSliderSize}
          hue={satValPickerHue}
          saturation={satValPickerSaturation}
          value={satValPickerValue}
          onDragStart={onSatValPickerDragStart}
          onDragMove={onSatValPickerDragMove}
          onDragEnd={onSatValPickerDragEnd}
          onDragTerminate={onSatValPickerDragTerminate}
          onPress={onSatValPickerPress}
          ref={this.satValPicker}
        />
        <HuePicker
          containerStyle={huePickerContainerStyle}
          borderRadius={huePickerBorderRadius}
          hue={huePickerHue}
          barWidth={huePickerBarWidth}
          barHeight={huePickerBarHeight}
          sliderSize={huePickerSliderSize}
          onDragStart={onHuePickerDragStart}
          onDragMove={onHuePickerDragMove}
          onDragEnd={onHuePickerDragEnd}
          onDragTerminate={onHuePickerDragTerminate}
          onPress={onHuePickerPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

HsvColorPicker.propTypes = {
  containerStyle: ViewPropTypes.style,
  huePickerContainerStyle: ViewPropTypes.style,
  huePickerBorderRadius: PropTypes.number,
  huePickerHue: PropTypes.number,
  huePickerBarWidth: PropTypes.number,
  huePickerBarHeight: PropTypes.number,
  huePickerSliderSize: PropTypes.number,
  onHuePickerDragStart: PropTypes.func,
  onHuePickerDragMove: PropTypes.func,
  onHuePickerDragEnd: PropTypes.func,
  onHuePickerDragTerminate: PropTypes.func,
  onHuePickerPress: PropTypes.func,
  satValPickerContainerStyle: ViewPropTypes.style,
  satValPickerBorderRadius: PropTypes.number,
  satValPickerSize: PropTypes.number,
  satValPickerSliderSize: PropTypes.number,
  satValPickerHue: PropTypes.number,
  satValPickerSaturation: PropTypes.number,
  satValPickerValue: PropTypes.number,
  onSatValPickerDragStart: PropTypes.func,
  onSatValPickerDragMove: PropTypes.func,
  onSatValPickerDragEnd: PropTypes.func,
  onSatValPickerDragTerminate: PropTypes.func,
  onSatValPickerPress: PropTypes.func,
};

HsvColorPicker.defaultProps = {
  containerStyle: {},
  huePickerContainerStyle: {},
  huePickerBorderRadius: 0,
  huePickerHue: 0,
  huePickerBarWidth: 12,
  huePickerBarHeight: 200,
  huePickerSliderSize: 24,
  onHuePickerDragStart: null,
  onHuePickerDragMove: null,
  onHuePickerDragEnd: null,
  onHuePickerDragTerminate: null,
  onHuePickerPress: null,
  satValPickerContainerStyle: {},
  satValPickerBorderRadius: 0,
  satValPickerSize: 200,
  satValPickerSliderSize: 24,
  satValPickerHue: 0,
  satValPickerSaturation: 1,
  satValPickerValue: 1,
  onSatValPickerDragStart: null,
  onSatValPickerDragMove: null,
  onSatValPickerDragEnd: null,
  onSatValPickerDragTerminate: null,
  onSatValPickerPress: null,
};
