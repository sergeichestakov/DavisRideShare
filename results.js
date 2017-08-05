import React, {Component} from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import Header from './header.js';

export default class Results extends Component {

  static navigationOptions = {
    headerStyle: {
      paddingTop: StatusBar.currentHeight,
      height: StatusBar.currentHeight + 60,
      backgroundColor: "rgb(66, 161, 244)"
    },
    headerTitleStyle: {
      color: 'white',
      alignSelf: 'center',
      marginRight: 56
    }
  }

  render(){
    const {params} = this.props.navigation.state;

    let display = null;
    if (params.city == "Orange Cove") {
      display = <Text style={styles.results}>Lol no one wants to go to Orange Cove</Text>
    } else {
      var results = [];
      for(var i=0; i<100;i++){
        results.push("Hella Results");
      }
      const items = results.map((result, index) =>
        <Text key={index} style={styles.results}>{result}</Text>
      )
      display = items;
    }

    return(
      <ScrollView>
        {display}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  results: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  }
});
