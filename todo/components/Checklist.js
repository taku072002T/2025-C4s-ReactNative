import React from 'react';
import { View } from 'react-native';
import ChecklistItem from './ChecklistItem';

// シンプルなチェックリスト
const Checklist = ({ items = [] }) => {
  return (
    <View>
      {items.map((item) => (
        <ChecklistItem key={item.id} text={item.text} />
      ))}
    </View>
  );
};

export default Checklist; 