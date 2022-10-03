import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Infobar(props) {
  return (
    <View style={styles.infoBar}>
      <View style={styles.subInfoBar}>
        <Text style={styles.subHeaderText}>ITEMS</Text>
        <Text style={styles.subText}></Text>
      </View>
      <View style={styles.subInfoBar}>
        <Text style={styles.subHeaderText}>FLOOR</Text>
        <Text style={styles.subText}>{props.floor}</Text>
      </View>
      <View style={styles.subInfoBar}>
        <Text style={styles.subHeaderText}>TOTAL FLOOR</Text>
        <Text style={styles.subText}></Text>
      </View>
      <View style={styles.subInfoBar}>
        <Text style={styles.subHeaderText}>1 DAY</Text>
        <Text style={styles.subText}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    flex: 2,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 110,
    height: 90,
    padding: 20,
    justifyContent: 'space-around',
    shadowRadius: 10,
  },
  subInfoBar: {
    flexDirection: 'column',
  },
  subText: {
    color: 'black',
  },
  subHeaderText: {
    color: 'gray',
  },
});
