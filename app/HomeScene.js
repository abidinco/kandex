import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigatePush } from './redux';
import {
  ListView,
  Tile,
  Text,
  Title,
  Image,
  Heading,
  View,
  Subtitle,
  Screen,
  Divider,
  Icon,
  TextInput,
  Button,
  TouchableOpacity,
} from '@shoutem/ui';

import {
  Picker,
  StatusBar,
  ToastAndroid,
  Modal,
  ScrollView,
} from 'react-native';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

class HomeScene extends Component {
  static propTypes = {
    onButtonPress: React.PropTypes.func,
    onButtonPressToCode: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCode: 'TMK',
      selectedLaw: 1,
      infoModalVisible: false
    }
    this.renderRow = this.renderRow.bind(this);
  }

  handleInfoModalToggle() {
    this.setState({
      infoModalVisible: !this.state.infoModalVisible
    })
  }

  handleGoToLaw() {
    const {onButtonPress} = this.props;
    switch(this.state.selectedCode) {
      case 'TBK':
        if(this.state.selectedLaw > 649 || this.state.selectedLaw < 1) {
          ToastAndroid.show("TBK maddeleri 1-649", ToastAndroid.SHORT);
          return false;
        } else {
          onButtonPress(this.state.selectedCode, this.state.selectedLaw);
        }
      case 'TMK':
        if(this.state.selectedLaw > 1030 || this.state.selectedLaw < 1) {
          ToastAndroid.show("TMK maddeleri 1-1030", ToastAndroid.SHORT);
          return false;
        } else {
          onButtonPress(this.state.selectedCode, this.state.selectedLaw);
        }
      default:
        return false;
    }
  }

  renderRow(code) {
    const {onButtonPressToCode} = this.props;
    return(
      <View>
        <TouchableOpacity onPress={() => onButtonPressToCode(code.codeShort)}>
          <Tile style={{alignItems: 'center', backgroundColor: 'transparent'}}>
            <Subtitle style={{padding: 5, fontSize: 12}}>{code.codeNumber} sayılı</Subtitle>
            <Title style={{padding: 7}}>{code.codeName}</Title>
          </Tile>
          <Divider styleName="line" />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const codes = [
      {"codeName": "Türk Medeni Kanunu", "codeShort": "TMK", "codeNumber": 4721},
      {"codeName": "Türk Borçlar Kanunu", "codeShort": "TBK", "codeNumber": 6098}
    ];
    return(
      <Screen>
        <NavigationBar
          title="kandex"
        />
        <StatusBar
          barStyle="light-content"
          backgroundColor="#bdc3c7"
        />
        <Image source={require('../assets/img/library-min.jpg')} style={{width: window.width, height: 62}}>
          <NavigationBar
            styleName="clear"
            title="kandex"
          />
        </Image>
        <View
          styleName="horizontal h-center space-around"
          style={{paddingTop: 40, paddingBottom: 40}}
        >
          <Picker
            selectedValue={this.state.selectedCode}
            onValueChange={(law) => this.setState({selectedCode: law})}
            style={{width: 150}}
            mode="dropdown"
          >
            <Picker.Item label="Medeni Kanun" value="TMK"/>
            <Picker.Item label="Borçlar Kanunu" value="TBK"/>
          </Picker>
          <TextInput
            style={stylesMainScene.selectLawInput.input}
            placeholder={stylesMainScene.selectLawInput.placeholder}
            keyboardType={stylesMainScene.selectLawInput.keyboardType}
            returnKeyType={stylesMainScene.selectLawInput.returnKeyType}
            underlineColorAndroid={stylesMainScene.selectLawInput.underline}
            maxLength={4}
            selectTextOnFocus={true}
            disableFullscreenUI={true}
            onSubmitEditing={this.handleGoToLaw.bind(this)}
            onChangeText={(law) => this.setState({selectedLaw: law})}
          />
        </View>
        <Divider styleName="line" />
        <ListView data={codes}
                  renderRow={code => this.renderRow(code)}/>
        <TouchableOpacity onPress={this.handleInfoModalToggle.bind(this)} style={{alignItems: 'center', padding: 10}}>
          <Text>kandex hakkında</Text>
        </TouchableOpacity>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.infoModalVisible}
          onRequestClose={this.handleInfoModalToggle.bind(this)}
          >
          <ScrollView>
            <View style={{padding: 22, alignItems: 'center'}}>
              <Text>kandex, sadeliği amaçlayan kâr amacı gütmeyen Türk kanunları için android platformuna yazılmış bi uygulama.</Text>
              <TouchableOpacity onPress={this.handleInfoModalToggle.bind(this)}><Text>KAPA</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </Screen>
    );
  }
}

const stylesMainScene = {
  selectLawInput: {
    underline: "rgb(52, 152, 219)",
    input: {
      backgroundColor: 'transparent',
      width: 150
    },
    returnKeyType: "go",
    keyboardType: "phone-pad",
    placeholder: "Madde numarası",
    maxLength: 4
  }
}

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (code, law) => {
    dispatch(navigatePush({
      key: 'DisplayLawScene',
      title: code + ' - ' + law,
    }, {code, law}));
  },
  onButtonPressToCode: (code) => {
    dispatch(navigatePush({
      key: 'DisplayCodeScene',
      title: code,
    }, {code}));
  },
});

export default connect(
  undefined,
  mapDispatchToProps
)(HomeScene);
