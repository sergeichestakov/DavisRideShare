import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';

export default class Header extends Component {
  render(){
    return(
      <View style={{backgroundColor: this.props.color}}>
        <View style={{height: StatusBar.currentHeight}}></View>
        <View style={{height: 60}}>
          <Text style={styles.header}>{this.props.children}</Text>
        </View>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
  }
});
