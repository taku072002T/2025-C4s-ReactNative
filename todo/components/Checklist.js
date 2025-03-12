import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChecklistItem from './ChecklistItem';


const Checklist = ({ items = [], removeItem }) => {
  return (
    <View style={styles.listcontainer}>
      {items.map((item) => (
        <ChecklistItem key={item.id} text={item.text} id={item.id} removeItem={removeItem}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listcontainer: {
    flex:1,
    flexDirection:'column',
    padding:20
  }
})
export default Checklist; 