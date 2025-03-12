import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Checkbox } from 'react-native-paper';

const ChecklistItem = ({ text, id, removeItem }) => {
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
      <Button title="削除" onPress={() => removeItem(id)}></Button>
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
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  }
});

export default ChecklistItem; 