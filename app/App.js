import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  CardStack,
  NavigationBar,
} from '@shoutem/ui/navigation';

import {
  BackAndroid,
  ToastAndroid,
  StatusBar,
  View,
} from 'react-native';

import {navigatePop} from './redux';
import HomeScene from './HomeScene';
import DisplayLawScene from './DisplayLawScene';
import DisplayCodeScene from './DisplayCodeScene';

class App extends Component {
  static propTypes = {
    onNavigateBack: React.PropTypes.func.isRequired,
    navigationState: React.PropTypes.object,
    scene: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    const {onNavigateBack} = this.props;
    BackAndroid.addEventListener('hardwareBackPress', () => {
      try {
        onNavigateBack();
        return true;
      } catch (err) {
        return false;
      }
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  renderScene(props) {
    const {route} = props.scene;
    let Screen;
    if(route.key === 'HomeScene') {
      Screen = HomeScene
    } else if(route.key === 'DisplayLawScene') {
      Screen = DisplayLawScene
    } else if(route.key === 'DisplayCodeScene') {
      Screen = DisplayCodeScene
    } else {
      Screen = HomeScene;
    }
    return (<Screen {...route.props}/>);
  }

  renderNavBar(props) {
    const {onNavigateBack, title} = this.props;
    return (
      <NavigationBar.View
        {...props}
        onNavigateBack={onNavigateBack}
      />
    );
  }

  render() {
    const {navigationState, onNavigateBack} = this.props;
    return(
      <CardStack
        navigationState={navigationState}
        onNavigateBack={onNavigateBack}
        renderNavBar={this.renderNavBar}
        renderScene={this.renderScene}
      />
    );
  }
}

export default connect(
  state => ({navigationState: state.navigationState}),
  {onNavigateBack: navigatePop}
)(App);
