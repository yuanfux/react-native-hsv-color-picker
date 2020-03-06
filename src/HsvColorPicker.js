import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
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
    const maxWidth = Dimensions.get('window').width - 32;
    const {
      containerStyle = {},
      huePickerContainerStyle = {},
      huePickerBorderRadius = 0,
      huePickerHue = 0,
      huePickerBarWidth = maxWidth,
      huePickerBarHeight = 12,
      huePickerSliderSize = 24,
      onHuePickerDragStart,
      onHuePickerDragMove,
      onHuePickerDragEnd,
      onHuePickerDragTerminate,
      onHuePickerPress,
      satValPickerContainerStyle = {},
      satValPickerBorderRadius = 0,
      satValPickerSize = { width: maxWidth, height: 200 },
      satValPickerSliderSize = 24,
      satValPickerHue = 0,
      satValPickerSaturation = 1,
      satValPickerValue = 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
