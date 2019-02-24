import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  PanResponder,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
import normalizeValue from './utils';

export default class HuePicker extends Component {
  constructor(props) {
    super(props);
    this.hueColors = [
      '#ff0000',
      '#ffff00',
      '#00ff00',
      '#00ffff',
      '#0000ff',
      '#ff00ff',
      '#ff0000',
    ];
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { hue } = this.props;
        this.dragStartValue = hue;
        this.fireEvent('onDragStart', gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.fireEvent('onDragMove', gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.fireEvent('onDragEnd', gestureState);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.fireEvent('onDragTerminate', gestureState);
      },
      onShouldBlockNativeResponder: () => true,
    });
  }

  getContainerStyle() {
    const { sliderSize, barWidth, containerStyle } = this.props;
    const paddingTop = sliderSize / 2;
    const paddingLeft = sliderSize - barWidth > 0 ? (sliderSize - barWidth) / 2 : 0;
    return [
      styles.container,
      containerStyle,
      {
        paddingTop,
        paddingBottom: paddingTop,
        paddingLeft,
        paddingRight: paddingLeft,
      },
    ];
  }

  getCurrentColor() {
    const { hue } = this.props;
    return chroma.hsl(hue, 1, 0.5).hex();
  }

  computeHueValue(gestureState) {
    const { dy } = gestureState;
    const { barHeight } = this.props;
    const { dragStartValue } = this;
    const diff = dy / barHeight;
    const updatedHue = normalizeValue(dragStartValue / 360 + diff) * 360;
    return updatedHue;
  }

  fireEvent(eventName, gestureState) {
    const { [eventName]: event } = this.props;
    if (event) {
      event({
        hue: this.computeHueValue(gestureState),
        gestureState,
      });
    }
  }

  render() {
    const { hueColors } = this;
    const {
      sliderSize,
      barWidth,
      barHeight,
      hue,
      borderRadius,
    } = this.props;
    return (
      <View style={this.getContainerStyle()}>
        {
          <LinearGradient
            colors={hueColors}
            style={{
              borderRadius,
            }}
          >
            <View style={{
              width: barWidth, height: barHeight,
            }}
            />
          </LinearGradient>
        }
        <View
          {...this.panResponder.panHandlers}
          style={[
            styles.slider,
            {
              width: sliderSize,
              height: sliderSize,
              borderRadius: sliderSize / 2,
              borderWidth: sliderSize / 10,
              backgroundColor: this.getCurrentColor(),
              transform: [{
                translateY: barHeight * hue / 360,
              }],
            },
          ]}
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
  slider: {
    top: 0,
    position: 'absolute',
    borderColor: '#fff',
  },
});

HuePicker.propTypes = {
  containerStyle: ViewPropTypes.style,
  borderRadius: PropTypes.number,
  hue: PropTypes.number,
  barWidth: PropTypes.number,
  barHeight: PropTypes.number,
  sliderSize: PropTypes.number,
  onDragStart: PropTypes.func,
  onDragMove: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragTerminate: PropTypes.func,
};

HuePicker.defaultProps = {
  containerStyle: {},
  borderRadius: 0,
  hue: 0,
  barWidth: 12,
  barHeight: 200,
  sliderSize: 24,
  onDragStart: null,
  onDragMove: null,
  onDragEnd: null,
  onDragTerminate: null,
};
