import React, { Component, PureComponent } from 'react';
import { Alert, StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { RaisedTextButton } from 'react-native-material-buttons';
import { StackNavigator } from 'react-navigation';
import TextField from 'react-native-md-textinput';
import Results from './Results.js';
import Header from './Header.js';

class DavisScene extends PureComponent {

  state = {
    daySelected: "",
    search: ""
  }

  async openAndroidDatePicker() {
    try {
      let today = new Date();
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: today,
        minDate: today,
        maxDate: new Date(+new Date + 6.048e+8) //1 week
      });
      if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          let selected = new Date(year, month, day);
          this.setState({daySelected: selected.toDateString(), search: ''});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  handleSearch = (text) => {
    this.setState({ search: text, daySelected: '' })
  }

  render(){
    let displayText = '';
    if(this.state.search){
      displayText = 'Searching for rides from ' + this.state.search + '...'
    }
    if(this.state.daySelected){
      displayText = 'Searching for rides on ' + this.state.daySelected + '...'
    }
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <TextField
            label={'Where to?'}
            highlightColor={'#00BCD4'}
            dense={true}
            autoCapitalize={'words'}
            onSubmitEditing={(event) => this.handleSearch(event.nativeEvent.text)}
          />
          <View>
            <Text>{displayText}</Text>
          </View>
        </ScrollView>
        <RaisedTextButton
          onPress={() => this.openAndroidDatePicker()}
          title="Select a Date"
          style={styles.dateButton}
        />
      </View>
    )
  }
}

class HomeScene extends PureComponent {

  state = {
    cities: [
      "Los Angeles",
      "San Jose",
      "San Francisco",
      "Orange Cove",
      "Sacramento",
      "San Diego",
      "Fremont",
      "Folsom",
      "Reedley",
      "Portland",
      "Russia"
    ]
  }

  render(){
    return(
      <ScrollView style={{flex: 1}}>
        {
          this.state.cities.map((item, index) => (
            <TouchableOpacity
              style={styles.listObject}
              key={index}
              onPress={() => this.props.navigation('Results', {city: item})}>
             <Text style={{color: 'white'}}>
                {item}
             </Text>
             </TouchableOpacity>
          ))
        }
      </ScrollView>
    )
  }
}

class Home extends PureComponent{

  static navigationOptions = {
      header: null
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Home' },
      { key: '2', title: 'to Davis' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={styles.tabBar}/>;

  _renderScene = navigation => SceneMap({
    '1': () => <HomeScene navigation={navigation}/>,
    '2': () => <DavisScene/>
  });

  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style= {{flex: 1, flexDirection: 'column'}}>
        <Header color="rgb(66, 161, 244)">Find a Ride</Header>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene(navigate)}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
        />
      </View>

    )
  }

}

const App = StackNavigator({
    HomeScene: {screen: Home},
    Results: {
      screen: Results,
      navigationOptions: ({navigation}) => ({
        title: `Rides to ${navigation.state.params.city}`,
      })
    }
  },
  { headerMode: 'screen' }
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: "rgb(66, 161, 244)"
  },
  homeTitle: {
    fontSize: 25,
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center'
  },
  listObject: {
    padding: 15,
    marginTop: 3,
    backgroundColor: '#C0C0C0',
    alignItems: 'center',
   },
   dateButton: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 100,
    bottom:50,
    width:200
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
});
