import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { database,auth } from '../firebase'
import { ref, get } from 'firebase/database'
import { useEffect, useState } from 'react'

const CardTweet = ({ post, remove }) => {
const [username, setUsername] = useState(null);
useEffect(() => {
 
    const fetchUsername = async () => {
      const profileRef = ref(database, `profiles/${post.user.uid}`);
      const snapshot = await get(profileRef);
      if (snapshot.exists()) {
        setUsername(snapshot.val().username);
      } else {
        // プロフィールが存在しない場合、メールアドレスをユーザーネームとして設定
        const userRef = ref(database, `users/${post.user.uid}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          setUsername(userSnapshot.val().email);
        }
      }
    };
    fetchUsername();
}, [post.user]);

return (
    <SafeAreaView style={styles.cardcontainer}>
    <View style={styles.card}>
    <Text style={styles.user}>{username}</Text>
    <Text style={styles.text}>{post.text}</Text>
    <Text style={styles.date}>{post.date}</Text>
    
    <Button style={styles.deleteButton} title="削除" onPress={() => {remove(post.id)}} />
    </View>
    </SafeAreaView>
);
};

export default CardTweet;

const styles = StyleSheet.create({
cardcontainer: {
},
card: {
},
text: {
},
user: {
},
date: {
},
deleteButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
},
});

