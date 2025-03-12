import React from 'react';
import { View } from 'react-native';
import ChecklistItem from './ChecklistItem';


const Checklist = ({ items, onToggleChecked, onDelete, isDeleteMode }) => {
  return (
    <View>
      {items.map((item) => (
        <ChecklistItem key={item.id} item={item} onToggleChecked={onToggleChecked} onDelete={onDelete} isDeleteMode={isDeleteMode} />
      ))}
    </View>
  );
};

export default Checklist; 