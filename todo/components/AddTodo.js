import { useState } from 'react';
import { Modal, TextInput, Button } from 'react-native';

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
        <TextInput value={text} onChangeText={setText} style={{borderWidth: 1, marginTop: 100}} />
        <Button title="追加" onPress={handleAdd} />
        <Button title="キャンセル" onPress={onClose} />
    </Modal>
);
};

export default AddTodoPopup;
