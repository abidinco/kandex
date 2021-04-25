import React, { Component } from 'react';
import {connect} from 'react-redux';
import {navigatePush} from './redux';

import {
  Screen,
  View,
  TextInput,
} from '@shoutem/ui';

import {
  Text,
  ListView,
} from 'react-native';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

let ds;

export default class DisplayCodeScene extends Component {
  constructor(props) {
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Bunları', 'görüyorsanız', 'bi şeyler', 'ters gitmiştir'])
    };
  }

  componentDidMount() {
    const {code} = this.props;
    let lol;
    this.state = {
      filterText: ''
    }
    switch(code) {
      case 'TBK':
          lol = require('../assets/data/TBK.json');
      case 'TMK':
          lol = require('../assets/data/TMK.json');
    }
    this.setState({
      dataSource: ds.cloneWithRows(lol),
    })
  }

  handleFilter(){
    alert(this.state.filterText);
  }

  render() {
    const {code} = this.props;
    // let renderCode = this.getCode(code);
    /*let renderLaws = renderCode.map((law, i) => {
      return (<Text key={i}>{law.clauses}</Text>);
    });*/
    return(
      <Screen>
        <NavigationBar
          title={code}
        />
        <TextInput
          placeholder="Kelime arayın"
          returnKeyType="go"
          selectTextOnFocus={true}
          style={{backgroundColor: 'transparent'}}
          disableFullscreenUI={true}
          onSubmitEditing={this.handleFilter.bind(this)}
          onChangeText={(text) => this.setState({filterText: text})}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => (
            <View style={{padding: 20}} key={rowID}>
              <Text>Madde {parseInt(rowID) + 1}</Text>
              <Text style={{fontSize: 18, color: 'black'}}>{rowData.clauses}</Text>
              <Text
                textBreakStrategy="highQuality"
                styleName="horizontal"
              >
                {rowData.sections}
              </Text>
            </View>
          )}
        />
      </Screen>
    )
  }
}
