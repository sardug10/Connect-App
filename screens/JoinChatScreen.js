import React,{useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button,Icon } from 'react-native-elements'
import { db, auth } from '../firebaseConfig';
import * as firebase from 'firebase';

const JoinChatScreen = ({navigation}) => {

    const [chatID,setChatID] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Join a Chat',
            headerTitleStyle:{
                alignSelf:'flex-start',
                color:'white'
            },
            headerBackTitle:'Chats'
        })
    },[navigation])

    const joinChat = async()=>{
        const chatRef = db.collection('chats').doc(chatID)
        // chatRef.get()
        const user = auth.currentUser.uid

        chatRef.update({
            users: firebase.firestore.FieldValue.arrayUnion(user)
        })
        setChatID('')
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Input placeholder='Enter chat ID' autoFocus={true} value={chatID} onSubmitEditing={joinChat} onChangeText={(text)=>setChatID(text)} leftIcon={<Icon type='antdesign' style={{marginRight:20}} name='wechat' size={24} color='black' />} />
            <Button disabled={!chatID} title='Join chat' onPress={joinChat} />
        </View>
    )
}

export default JoinChatScreen

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        width:'60%',
        marginLeft:'20%'
    }
})
