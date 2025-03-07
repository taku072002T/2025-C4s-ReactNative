import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Checklist from './components/Checklist';

// サンプルデータ
const todoItems = [
  { id: 1, text: '勉強！' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Checklist items={todoItems} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
});
