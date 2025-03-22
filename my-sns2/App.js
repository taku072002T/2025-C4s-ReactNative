import Home from './components/Home'
import Search from './components/Search'
import Profile from './components/Profile'
import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
export default function App() {
const [currentTab, setCurrentTab] = useState('home')
return (
    <View>
        <View style={styles.header} stickyHeaderIndices={[1]} >
          <Image source={require('./assets/logo.png')} style={styles.logo}/>
          <Text style={styles.title}>C4's Portal Mobile{"\n"}2025</Text>
          <View style={styles.headerSeparator} />
        </View>
        { currentTab === 'home' && <Home /> }
        { currentTab === 'search' && <Search /> }
        { currentTab === 'profile' && <Profile /> }
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab('home')}>
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab('search')}>
            <Text style={styles.tabText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setCurrentTab('profile')}>
            <Text style={styles.tabText}>Profile</Text>
          </TouchableOpacity>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '150%',
        position: 'sticky',
        top: 0,
      },
      headerSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.05,
        marginBottom: 10,
        padding: 1,
        position: 'absolute',
        top: 80,
        right: 10,
        zIndex: 100,
      },
      logo: {
        paddingLeft: 30,
        width: 50,
        height: 50,
        color: 'black',
      },
      tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: 'orange',
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        left: 0,
        width: '100%',
      },
      tab: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
      },
      tabText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});