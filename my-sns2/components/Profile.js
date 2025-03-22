import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ref, get, set } from 'firebase/database';
import { database, auth } from '../firebase';

export default function Profile({ userId, onStartDM }) {
  const [profile, setProfile] = useState({
    username: '',
    comment: 'よろしくお願いします',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {

    // 自分のプロフィールかどうかを確認
    setIsOwnProfile(auth.currentUser?.uid === userId);
    
    // プロフィール情報を取得
    const fetchProfile = async () => {
      const profileRef = ref(database, `profiles/${userId}`);
      const snapshot = await get(profileRef);
      if (snapshot.exists()) {
        setProfile({
          ...profile,
          username: snapshot.val().username,
          comment: snapshot.val().comment
        });
      } else {
        // プロフィールが存在しない場合、メールアドレスをユーザーネームとして設定
        const userRef = ref(database, `users/${userId}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          setProfile({
            ...profile,
            username: userSnapshot.val().email
          });
        }
      }
    };
    
    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    const profileRef = ref(database, `profiles/${userId}`);
    await set(profileRef, profile);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={profile.username}
            onChangeText={(text) => setProfile({ ...profile, username: text })}
            placeholder="ユーザーネーム"
          />
          <TextInput
            style={styles.input}
            value={profile.comment}
            onChangeText={(text) => setProfile({ ...profile, comment: text })}
            placeholder="コメント"
          />
          <Button title="保存" onPress={handleSave} />
          <Button title="キャンセル" onPress={() => setIsEditing(false)} />
        </View>
      ) : (
        <View>
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.comment}>{profile.comment}</Text>
          {isOwnProfile ? (
            <Button title="メッセージを送る" onPress={() => onStartDM(userId)} />
          ) : (
            
            <Button title="編集" onPress={() => setIsEditing(true)} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -295
  },
}); 