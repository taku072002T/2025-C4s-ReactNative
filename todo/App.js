import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import Checklist from './components/Checklist';
import React, { useState } from 'react';
import AddTodoPopup from './components/AddTodo';

// サンプルデータ
const todoItems = [
];

export default function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [TodoItems, setTodoItems] = useState(todoItems);

  const addTodoItem = (text) => {
    setTodoItems([...TodoItems, { id: TodoItems.length + 1, text }]);
  };

  return (
    <View style={styles.container}>
      <Checklist items={TodoItems} />
      <StatusBar style="auto" />
      <Button title="項目を追加" onPress={() => setPopupVisible(true)} />
      <AddTodoPopup visible={isPopupVisible} onClose={() => setPopupVisible(false)} onAdd={addTodoItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
