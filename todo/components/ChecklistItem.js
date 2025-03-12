import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ChecklistItem = ({ item, onToggleChecked, onDelete, isDeleteMode }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.checkbox}>
        <Checkbox status={item.checked ? 'checked' : 'unchecked'} onPress={() => onToggleChecked(item.id)} />
      </TouchableOpacity>
      <Text style={item.checked ? styles.checkedText : {}}>{item.text}</Text>
      {isDeleteMode && (
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      )}
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