import React, { Component } from 'react';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  PanResponder,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tinycolor from 'tinycolor2';
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
        const { hue = 0 } = this.props;
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
    const { hue = 0, barHeight = 200 } = this.props;
    if (
      prevProps.hue !== hue
      || prevProps.barHeight !== barHeight
    ) {
      this.sliderY.setValue(barHeight * hue / 360);
    }
  }

  getContainerStyle() {
    const { sliderSize = 24, barWidth = 12, containerStyle = {} } = this.props;
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
    const { hue = 0 } = this.props;
    return tinycolor(`hue ${hue} 1.0 0.5`).toHexString();
  }

  computeHueValueDrag(gestureState) {
    const { dy } = gestureState;
    const { barHeight = 200 } = this.props;
    const { dragStartValue } = this;
    const diff = dy / barHeight;
    const updatedHue = normalizeValue(dragStartValue / 360 + diff) * 360;
    return updatedHue;
  }

  computeHueValuePress(event) {
    const { nativeEvent } = event;
    const { locationY } = nativeEvent;
    const { barHeight = 200 } = this.props;
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
      sliderSize = 24,
      barWidth = 12,
      barHeight = 200,
      borderRadius = 0,
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
