import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigatePush } from './redux';
import {
  Screen,
  Title,
  Heading,
  View,
  Subtitle,
  Divider,
  Icon,
  Button,
} from '@shoutem/ui';

import {
  ScrollView,
  Text,
} from 'react-native';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

export default class DisplayLawScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCode: 'TBK',
      currentLaw: 1
    }
  }

  getLaw(code, law) {
    let currentCode;
    switch(code) {
      case 'TBK':
        currentCode = require('../assets/data/TBK.json');
        return currentCode[law - 1];
      case 'TMK':
        currentCode = require('../assets/data/TMK.json');
        return currentCode[law - 1];
      default:
        return;
    }
  }

  componentDidMount() {
    const {code, law} = this.props;
    this.setState({
      currentCode: code,
      currentLaw: law,
    });
  }

  handleBackButton() {
    this.setState({
      currentLaw: parseInt(this.state.currentLaw) - 1,
    });
  }

  handleForwardButton() {
    this.setState({
      currentLaw: parseInt(this.state.currentLaw) + 1,
    });
  }

  render() {
    const code = this.state.currentCode,
          law = this.state.currentLaw;
    let renderLaw = this.getLaw(code, law);
    let sections = renderLaw.sections.map((section, i) => {
      return (<Text key={i}> > <Text>{section} </Text></Text>)
    });
    let reversedSections = sections.reverse();
    let clauses = renderLaw.clauses.map((clause, i) => {
      return (<Title style={{marginBottom: 20, fontSize: 18}} key={i}>{clause}</Title>);
    });
    return(
      <Screen styleName="paper full-screen">
        <NavigationBar
          title={code + " - " + law}
        />
        <ScrollView style={{paddingRight: 30, paddingLeft: 30}}>
          {clauses}
        </ScrollView>
        <View
          style={{backgroundColor: '#ecf0f1',
                  padding: 10,
                  flexDirection: 'row',
                  flexWrap: 'wrap'}}
        >
          <Text style={{fontSize: 15}}>
            {reversedSections}
          </Text>
        </View>
        <View styleName="horizontal space-around">
          {(parseInt(law) < 2) ? (
            <Text></Text>
          ) : (
            <Button onPress={this.handleBackButton.bind(this)} styleName="clear" style={{flex: 1, padding: 25, backgroundColor: '#eaecec'}}>
              <Icon name="left-arrow"/>
              <Text>{parseInt(law) - 1}</Text>
            </Button>
          )}
          <Button onPress={this.handleForwardButton.bind(this)} styleName="clear" style={{flex: 2, padding: 25, backgroundColor: '#f4f5f5'}}>
            <Text>{parseInt(law) + 1}</Text>
            <Icon name="right-arrow"/>
          </Button>
        </View>
      </Screen>
    )
  }
}
