import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

const ChecklistItem = ({ text }) => {
  const [checked, setChecked] = useState(false);
  
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.checkbox}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
        />
      </TouchableOpacity>
      <Text style={checked ? styles.checkedText : {}}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#888', // チェック済みテキストは色を薄くする
  }
});

export default ChecklistItem; 