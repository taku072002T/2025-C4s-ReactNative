import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { ref, push, onValue, get } from 'firebase/database';
import { database, auth } from '../firebase';

export default function DirectMessage({ targetUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [targetUsername, setTargetUsername] = useState('');
  const [senderUsername, setSenderUsername] = useState('');

  useEffect(() => {
    // 相手のユーザー名を取得
    const fetchUsernames = async () => {
      const targetProfileRef = ref(database, `profiles/${targetUserId}`);
      const senderProfileRef = ref(database, `profiles/${auth.currentUser.uid}`);
      
      const [targetSnapshot, senderSnapshot] = await Promise.all([
        get(targetProfileRef),
        get(senderProfileRef)
      ]);

      if (targetSnapshot.exists()) {
        setTargetUsername(targetSnapshot.val().username);
      }
      if (senderSnapshot.exists()) {
        setSenderUsername(senderSnapshot.val().username);
      }
    };
    fetchUsernames();

    // DMを監視
    const chatRoomId = [auth.currentUser.uid, targetUserId].sort().join('_');
    const messagesRef = ref(database, `dms/${chatRoomId}`);
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesArray = Object.values(snapshot.val());
        setMessages(messagesArray);
      }
    });

    return () => unsubscribe();
  }, [targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const chatRoomId = [auth.currentUser.uid, targetUserId].sort().join('_');
    const messagesRef = ref(database, `dms/${chatRoomId}`);
    
    push(messagesRef, {
      text: newMessage,
      senderId: auth.currentUser.uid,
      senderUsername: senderUsername || auth.currentUser.email,
      timestamp: new Date().toISOString()
    });

    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{targetUsername}とのメッセージ</Text>
      <View style={styles.separator} />
      <ScrollView style={styles.messageList}>
        {messages
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((message, index) => (
            <View key={index}>
              <View 
                style={[
                  styles.message,
                  message.senderId === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage
                ]}
              >
                <Text style={styles.username}>{message.senderUsername}</Text>
                <Text>{message.text}</Text>
                <Text style={styles.timestamp}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.separator} />
            </View>
          ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="メッセージを入力..."
        />
        <Button title="送信" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  username: {
    color: 'blue',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 10,
    width: '100%',
  },
});
