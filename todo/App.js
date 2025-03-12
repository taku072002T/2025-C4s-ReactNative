import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import Checklist from './components/Checklist';
import { useState } from 'react';


// サンプルデータ
const TodoItems = [
  { id: 1, text: 'サンプル1'},
  { id: 2, text: 'サンプル2'},
  { id: 3, text: 'サンプル3'},
];


export default function App() {
  const [todoItems, settodoItems] = useState(TodoItems);
  const [todoText, settodoText] = useState('')

  const removeItem = (id) =>{
    settodoItems(todoItems.filter((todoitem) => todoitem.id !== id));
  }

  const addtodoItems = () => {
    settodoItems([...todoItems, { id: todoItems.length + 1, text: todoText}])
  }

  return (
    <View style={styles.container}>
      <Checklist items={todoItems} removeItem={removeItem} />
      <StatusBar style="auto" />
      <TextInput value={todoText} onChangeText={(text) => {settodoText(text)}}></TextInput>
      <Button title="追加" onPress={addtodoItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'blue'
  }
});
