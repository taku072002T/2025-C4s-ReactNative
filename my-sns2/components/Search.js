import React, { useState } from 'react'
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native'
import CardTweet from './CardTweet'
import { ref, set, onValue, remove } from 'firebase/database'
import { database } from '../firebase'
import { useEffect } from 'react'


const Search = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const postsRef = ref(database, 'posts')
        const unsubscribe = onValue(postsRef, (snapshot) => {
            if (snapshot.val()) {
                setPosts(Object.values(snapshot.val()))
            } else {
                setPosts([])
            }
            
        })
        return () => unsubscribe()
    }, [])

    const removePost = (id) => {
        const postRef = ref(database, `posts/${id}`)
        remove(postRef)
      }

    const filterHandler = () => {
        const filteredPosts = posts.filter((post) => post.text.includes(search))
        setPosts(filteredPosts)
    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput placeholder="Search" onChangeText={setSearch} value={search} />
                <Button title="Search" onPress={filterHandler} />
            </View>
                <ScrollView style={styles.scroll}>
                    {posts.sort((a, b) => b.date - a.date).map((post, key) => (
                        <CardTweet key={key} post={post} remove={removePost} />
                    ))}
                </ScrollView>
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: -295
      },
      scroll: {
        paddingRight:150,
        paddingBottom: 500,
        padding: 10,
        left:50,
        top:150
      },
      search: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
      },
})