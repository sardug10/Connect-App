import React, {useLayoutEffect, useEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem';
import HeaderComponent from '../components/HeaderComponent';
import { auth,db } from '../firebaseConfig';

// import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([])

    const signUserOut = ()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        })
    }

    useEffect(()=>{
        const unsubscribe = db.collection('chats').onSnapshot((snapshot)=>{
            setChats(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
        })
        return unsubscribe
    },[])

    const myChats = []

    chats.forEach((chat)=>{
        chat.data.users.forEach((user)=>{
            if(user === auth.currentUser.uid){
                myChats.push(chat)
            }
        })
    })

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Connect',
            headerTitleStyle:{
                alignSelf:'flex-start',
                color:'white'
            },
            headerStyle:{backgroundColor:'#2c6eed'},
            headerTintStyle:{ color:'black' },
            headerTintColor:'white',
            headerLeft:()=>(
            <TouchableOpacity activeOpacity={0.5} onPress={signUserOut}> 
                <HeaderComponent/>
            </TouchableOpacity>),
            headerRight:()=>(
                <View style={{marginRight:20}}>
                    <TouchableOpacity style={{flexDirection:'row'}} activeOpacity={0.5} >
                        <Icon style={{marginLeft:40}} name='search-outline' type='ionicon' color='white' onPress={()=>navigation.navigate('JoinChat')} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName)=>{
        navigation.navigate('Chat',{
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    myChats.map(({id, data:{chatName}})=>(
                        <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))
                }                 
            </ScrollView>
            <View style={styles.create}> 
                <Icon name='create-outline' style={{marginRight:20}} type='ionicon' color='#2c6eed' size={35} onPress={()=>{navigation.navigate('AddChat')}} />
            </View>           
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:'100%'
    },
    create:{
        position:'absolute',
        right:25,
        bottom:50
    }
})
