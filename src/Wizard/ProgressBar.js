import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class ProgressBar extends Component {
  static propTypes = {
    percentage: PropTypes.number.isRequired,
  };

  barStyle = (type) => {
    const { percentage } = this.props;
    const complete = type === 'complete';
    const backgroundColor = complete ? '#00a651' : '#e6e7e8';
    const width = complete ? `${percentage * 100}%` : `${(1 - percentage) * 100}%`;

    return {
      backgroundColor,
      width,
      height: 2,
    };
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={this.barStyle('complete')} />
        <View style={this.barStyle('incomplete')} />
      </View>
    );
  }
}
