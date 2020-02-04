import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  ViewPropTypes,
  PanResponder,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    this.firePressEvent = this.firePressEvent.bind(this);
    this.sliderY = new Animated.Value(props.barHeight * props.hue / 360);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { hue } = this.props;
        this.dragStartValue = hue;
        this.fireDragEvent('onDragStart', gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.fireDragEvent('onDragMove', gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.fireDragEvent('onDragEnd', gestureState);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.fireDragEvent('onDragTerminate', gestureState);
      },
      onShouldBlockNativeResponder: () => true,
    });
  }

  componentDidUpdate(prevProps) {
    const { hue, barHeight } = this.props;
    if (
      prevProps.hue !== hue
      || prevProps.barHeight !== barHeight
    ) {
      this.sliderY.setValue(barHeight * hue / 360);
    }
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

  computeHueValueDrag(gestureState) {
    const { dy } = gestureState;
    const { barHeight } = this.props;
    const { dragStartValue } = this;
    const diff = dy / barHeight;
    const updatedHue = normalizeValue(dragStartValue / 360 + diff) * 360;
    return updatedHue;
  }

  computeHueValuePress(event) {
    const { nativeEvent } = event;
    const { locationY } = nativeEvent;
    const { barHeight } = this.props;
    const updatedHue = normalizeValue(locationY / barHeight) * 360;
    return updatedHue;
  }

  fireDragEvent(eventName, gestureState) {
    const { [eventName]: event } = this.props;
    if (event) {
      event({
        hue: this.computeHueValueDrag(gestureState),
        gestureState,
      });
    }
  }

  firePressEvent(event) {
    const { onPress } = this.props;
    if (onPress) {
      onPress({
        hue: this.computeHueValuePress(event),
        nativeEvent: event.nativeEvent,
      });
    }
  }

  render() {
    const { hueColors } = this;
    const {
      sliderSize,
      barWidth,
      barHeight,
      borderRadius,
    } = this.props;
    return (
      <View style={this.getContainerStyle()}>
        <TouchableWithoutFeedback onPress={this.firePressEvent}>
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
        </TouchableWithoutFeedback>
        <Animated.View
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
                translateY: this.sliderY,
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
  onPress: PropTypes.func,
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
  onPress: null,
};
