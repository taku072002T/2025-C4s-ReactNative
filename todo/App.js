import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import Checklist from './components/Checklist';
import React, { useState, useEffect } from 'react';
import AddTodoPopup from './components/AddTodo';
import database from './Firebase';
import { ref, onValue, set, remove } from 'firebase/database';


const todoItems = [
];

export default function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [TodoItems, setTodoItems] = useState(todoItems);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    const todoRef = ref(database, 'todoItems');
    const unsubscribe = onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTodoItems(Object.values(data));
      } else {
        setTodoItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTodoItem = (text) => {
    const newItem = { id: TodoItems.length + 1, text, checked: false };
    const todoItemRef = ref(database, `todoItems/${newItem.id}`);
    set(todoItemRef, newItem);
  };

  const toggleChecked = (id) => {
    const item = TodoItems.find(item => item.id === id);
    if (item) {
      const todoItemRef = ref(database, `todoItems/${id}`);
      set(todoItemRef, { ...item, checked: !item.checked });
    }
  };

  const deleteTodoItem = (id) => {
    const todoItemRef = ref(database, `todoItems/${id}`);
    remove(todoItemRef);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <View style={styles.container}>
      <Checklist items={TodoItems} onToggleChecked={toggleChecked} onDelete={deleteTodoItem} isDeleteMode={isDeleteMode} />
      <View style={{flexDirection: 'row'}}>
        <Button title="項目を追加" onPress={() => setPopupVisible(true)} />
        <Button title="項目を削除" onPress={toggleDeleteMode} color={isDeleteMode ? "red" : undefined} />
      </View>
      <AddTodoPopup visible={isPopupVisible} onClose={() => setPopupVisible(false)} onAdd={addTodoItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
