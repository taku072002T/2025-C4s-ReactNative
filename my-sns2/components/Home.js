import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { database, auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, set, onValue, remove } from 'firebase/database'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ScrollView } from 'react-native'
import { Svg } from 'react-native-svg'
import CardTweet from './CardTweet'
import 'react-native-get-random-values'
import { SafeAreaView } from 'react-native-web';

const Home = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const [PostPopup, setPostPopup] = useState(false)
  

  useEffect(()=>{
    const postRef = ref(database, 'posts')

    onValue(postRef, (snapshot)=>{
      const data = snapshot.val()
      console.log(data)
      if (data){
        setPosts(Object.values(data))
      } else{
        setPosts([])
      }
    })
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const Register =  (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    setPassword('')
  }


  const Login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
    setEmail('')
  }

  const Logout = () => {
    signOut(auth);
  }

  const addPost = () => {
    const now = new Date();
    const postid = uuidv4()
    const postRef = ref(database, `posts/${postid}`)
    set(postRef, {
      id: postid,
      text: postText,
      user: user.email,
      date: now.toISOString()
    })
    setPostText('')
    setPostPopup(false)
  }

  const removePost = (id) => {
    const postRef = ref(database, `posts/${id}`)
    remove(postRef)
  }

  return (
    <View style={styles.container}>
        
        
        {user ? (
        <ScrollView style={styles.scroll}>
          
              
              
              <View style={styles.postcontainer}>
                {posts.sort((a, b) => b.date - a.date).map((post, key) => (
                  <View style={styles.postitem} key={key}>
                    <CardTweet post={post} remove={() => {removePost(post.id)}} />
              </View>
              ))}
              </View>
          </ScrollView>
          ) : (
            
            <View style={styles.loginContainer}>
              <ImageBackground 
          source={require('../assets/login.jpg')} 
          style={styles.background}
        >
              <Image source={require('../assets/question.png')} style={styles.question}/>
              <Image source={require('../assets/person.png')} style={styles.person}/>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.input} 
                  placeholder='メールアドレス' 
                  value={email} 
                  onChangeText={(tonakai) => {setEmail(tonakai)}} 
                />
                <TextInput 
                  style={styles.input} 
                  placeholder='パスワード' 
                  value={password} 
                  onChangeText={(santa) => {setPassword(santa)}} 
                />
              </View>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => {Register(email, password)}}
              >
                <Text style={styles.buttonText}>登録</Text>
              </TouchableOpacity>
              <TouchableOpacity 
            style={styles.LoginButton} 
            onPress={() => {Login(email, password)}}
          >
            <Text style={styles.buttonText}>ログイン</Text>
          </TouchableOpacity>
          </ImageBackground>
          </View>
          
          )}

        
        {PostPopup && (
          <SafeAreaView style={styles.postpopup}>
                  <TextInput 
                    style={styles.postinput} 
                    placeholder='投稿内容を入力' 
                    value={postText} 
                    onChangeText={(text) => {setPostText(text)}} 
                  />
                  <Button 
                    style={styles.postbutton} 
                    title='投稿' 
                    onPress={() => {addPost()}} 
                  />
          </SafeAreaView>
              )}
          
          { user && (
            <TouchableOpacity 
                style={styles.sendButton} 
                onPress={() => {setPostPopup(true)}}
              >
                <Image source={require('../assets/send.png')} style={styles.send}/>
          </TouchableOpacity>
          )}

        {user && (
          <TouchableOpacity 
            style={styles.LogoutButton} 
            onPress={() => {Logout()}}
          >
            <Text style={styles.buttonText}>ログアウト</Text>
          </TouchableOpacity>
        )}

        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    borderRadius: 100,
    position: 'absolute',
    bottom: -250,
    right: -220,
  },
  send: {
    top: 30,
    left: 30,
    width: 40,
    height: 40,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -295
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  scroll: {
    position: 'absolute',
    paddingRight:300,
    paddingBottom: 500,
    padding: 10,
    left:50,
    top:100
  },
  
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '120%',
    width: '120%',
    cover: 'cover',

  },
  person: {
    width: 200,
    height: 200,
    color: 'white',
    marginTop:60,
    left: 0,
  },
  question: {
    width: 100,
    height: 100,
    color: 'white',
    position: 'absolute',
    top: 50,
    right: 0,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 10,
  },
  button:{
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoutButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    right: -190,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    cover: 'cover',
  },
  useremail: {
    color: 'black',
    position: 'absolute',
    top: 15,
    right: 0,
  },
  separator: {
    height: 1,
    width: '200%',
    backgroundColor: 'black',
    opacity: 0.05,
    marginBottom: 10,
    padding: 1,
  },
  postpopup: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
    padding: 1000,
    width: '100%',
    position: 'absolute',
    top: 100,
    left:100
  },
  postinput: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  postbutton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 100,
    zIndex: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  postcontainer: {
    borderRadius: 5,
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 50
  },
  postitem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    width: '200px',
    height: '200px',
  },
  LoginButton: {
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  loginContainer: {
    padding: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default Home;