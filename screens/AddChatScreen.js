import React,{useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button,Icon } from 'react-native-elements'
import { db, auth } from '../firebaseConfig';

const AddChatScreen = ({navigation}) => {

    const [chatName,setChatName] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Add a new Chat',
            headerTitleStyle:{
                alignSelf:'flex-start',
                color:'white'
            },
            headerBackTitle:'Chats'
        })
    },[navigation])

    const createChat = async()=>{
        await db
            .collection('chats')
            .add({
                chatName,
                users:[auth.currentUser.uid]
            })
            .then(()=>{
                navigation.goBack();
            })
            .catch((error)=>alert(error))
    }

    return (
        <View style={styles.container}>
            <Input placeholder='Enter chat name' autoFocus={true} value={chatName} onSubmitEditing={createChat} onChangeText={(text)=>setChatName(text)} leftIcon={<Icon type='antdesign' style={{marginRight:20}} name='wechat' size={24} color='black' />} />
            <Button disabled={!chatName} title='Create chat' onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        marginTop:50,
        width:'60%',
        marginLeft:'20%'
    }
})
