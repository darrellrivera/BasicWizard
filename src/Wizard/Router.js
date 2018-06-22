import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';
import { last } from 'lodash';

export default class Router extends Component {
  static propTypes = {
    handleNavChange: PropTypes.func.isRequired,
    handleNavRef: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func.isRequired,
      routeName: PropTypes.string.isRequired,
    })).isRequired,
    title: PropTypes.string.isRequired,
  }

  componentWillMount() {
    this.Navigator = this.generateNavigator();
  }

  generateNavigator = () => {
    const { steps, title } = this.props;
    const navigationRoutes = {};
    steps.forEach((step, index) => {
      const routeOptions = { screen: step.component };
      navigationRoutes[step.routeName] = routeOptions;
    });

    const navigationOptions = {
      headerStyle: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
      },
      headerTintColor: '#111111',
      headerTitle: title,
    };

    return createStackNavigator(navigationRoutes, { navigationOptions });
  }

  handleRef = (navigator) => {
    this.props.handleNavRef(navigator);
  }

  handleNavigationChange = (prevState, currentState, action) => {
    const { isTransitioning, routes } = currentState;
    if (isTransitioning) {
      const { routeName } = last(routes);
      this.props.handleNavChange(routeName);
    }
  }

  render() {
    const { Navigator } = this;
    return (
      <Navigator
        onNavigationStateChange={this.handleNavigationChange}
        ref={this.handleRef}
      />
    );
  }
}
