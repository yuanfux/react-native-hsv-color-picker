import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HsvColorPicker from '../src';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      sat: 0,
      val: 1,
    };
    this.onSatValPickerDragMove = this.onSatValPickerDragMove.bind(this);
    this.onHuePickerDragMove = this.onHuePickerDragMove.bind(this);
    this.hsvColorPicker = React.createRef();
  }

  onSatValPickerDragMove({ saturation, value }) {
    this.setState({
      sat: saturation,
      val: value,
    });
  }

  onHuePickerDragMove({ hue }) {
    this.setState({
      hue,
    });
  }

  render() {
    const { hue, sat, val } = this.state;
    return (
      <View>
        <LinearGradient
          colors={['#c3cfe2', '#f5f7fa']}
          style={{height: '100%', width: '100%'}}
        >
        <View style={styles.container}>
          <HsvColorPicker
            huePickerContainerStyle={{marginLeft: 20}}
            huePickerBorderRadius={10}
            huePickerHue={hue}
            onHuePickerDragMove={this.onHuePickerDragMove}
            satValPickerBorderRadius={10}
            satValPickerHue={hue}
            satValPickerSaturation={sat}
            satValPickerValue={val}
            onSatValPickerDragMove={this.onSatValPickerDragMove}
          />
        </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
