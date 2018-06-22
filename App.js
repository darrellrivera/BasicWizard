/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  View
} from 'react-native';

import Wizard from './src/Wizard';

export default class App extends Component {
  handleSubmitWizard = () => {
    Alert.alert('Wizard has been submitted');
  }

  render() {
    const steps = [
      { component: View, routeName: 'Step1' },
      { component: View, routeName: 'Step2' },
      { component: View, routeName: 'Step3' },
    ];
    return (
      <Wizard
        handleSubmitWizard={this.handleSubmitWizard}
        steps={steps}
        title='Basic Wizard Example'
      />
    );
  }
}
