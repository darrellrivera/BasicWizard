import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { findIndex } from 'lodash';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import ProgressBar from './ProgressBar';
import Router from './Router';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    width: '100%',
  },
  safeAreaView: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#f7f7f7',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  touchableHighlight: {
    alignItems: 'center',
    backgroundColor: '#e6e7e8',
    justifyContent: 'center',
    margin: 15,
    padding: 15,
    width: '100%',
  },
};

export default class Wizard extends Component {
  static propTypes = {
    handleSubmitWizard: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func.isRequired,
      routeName: PropTypes.string.isRequired,
    })).isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    currentStepIndex: 0,
  };

  currentStep = () => {
    const { currentStepIndex } = this.state;
    const { steps } = this.props;
    return steps[currentStepIndex];
  }

  handleOnPressButton = () => {
    if (this.onLastStep()) {
      this.props.handleSubmitWizard();
    } else {
      const currentStepIndex = this.state.currentStepIndex + 1;
      const { routeName } = this.props.steps[currentStepIndex];
      this.navigator.dispatch(
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
        }),
      );
    }
  }

  onHandleNavChange = (routeName) => {
    const currentStepIndex = findIndex(this.props.steps, step => step.routeName === routeName);
    this.setState({ currentStepIndex });
  }

  onHandleNavRef = (navigator) => {
    this.navigator = navigator;
  }

  onLastStep = () => {
    const { steps } = this.props;
    const { currentStepIndex } = this.state;
    return (currentStepIndex + 1 === steps.length);
  }

  renderNavigationActions = () => {
    const { steps } = this.props;
    const { currentStepIndex } = this.state;
    const currentStep = this.currentStep();

    return (
      <SafeAreaView
        style={styles.safeAreaView}
      >
        <Text style={{ padding: 10}}>
          Step {currentStepIndex + 1} of {steps.length}
        </Text>
        <ProgressBar
          percentage={(currentStepIndex + 1) / steps.length}
        />
        <TouchableHighlight
          onPress={this.handleOnPressButton}
          style={styles.touchableHighlight}
        >
          <Text>
            { this.onLastStep() ? 'SUBMIT' : 'NEXT' }
          </Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }

  render() {
    const {
      steps,
      title,
    } = this.props;

    return (
      <View style={styles.container}>
        <Router
          handleNavChange={this.onHandleNavChange}
          handleNavRef={this.onHandleNavRef}
          steps={steps}
          title={title}
        />
        { this.renderNavigationActions() }
      </View>
    );
  }
}
