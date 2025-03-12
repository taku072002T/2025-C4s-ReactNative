import { useState } from 'react';
import { Modal, TextInput, Button, View, StyleSheet } from 'react-native';

const AddTodoPopup = ({ visible, onClose, onAdd }) => {
const [text, setText] = useState('');

const handleAdd = () => {
    if (text) {
    onAdd(text);
    setText('');
    onClose();
    }
};

return (
    <Modal visible={visible}>
        <View style={styles.modalContainer}>
            <TextInput value={text} onChangeText={setText} style={{borderWidth: 1, padding: 10, width: 200, backgroundColor: 'white'}}/>
            <Button title="追加" onPress={handleAdd} />
            <Button title="キャンセル" onPress={onClose} />
        </View>
    </Modal>
);
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default AddTodoPopup;
