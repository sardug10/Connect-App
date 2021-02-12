import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView,KeyboardAvoidingView,TouchableOpacity, Platform,ScrollView,TextInput, TouchableWithoutFeedback, Keyboard,Clipboard } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Avatar, Icon } from 'react-native-elements'
import { db, auth } from '../firebaseConfig';
import * as firebase from 'firebase';
// import Clipboard from '@react-native-clipboard/clipboard';

const ChatScreen = ({navigation, route}) => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    // const showChatInfo = (route)=>{
    //     navigation.navigate('Information',{
    //         id:route.id
    //     })
    // }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:route.params.chatName,
            headerTitleStyle:{
                alignSelf:'flex-start'
            },
            headerStyle:{backgroundColor:'#2c6eed'},
            headerRight:()=>(
                <View style={{marginRight:20}}>
                    <TouchableOpacity style={{flexDirection:'row'}} activeOpacity={0.5} onPress={()=>Clipboard.setString(route.params.id)} >
                        <Icon name='information-circle-outline' style={{marginRight:20}} type='ionicon' color='white'/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])

    useLayoutEffect(()=>{
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages')
                            .orderBy('timestamp','asc').onSnapshot((snapshot)=>{
                                setMessages(
                                    snapshot.docs.map((doc)=>({
                                        id:doc.id,
                                        data:doc.data()
                                    }))
                                )
                            })

        return unsubscribe
    },[route])

    

    const sendMessage = ()=>{
        // Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:message,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email
        })

        setMessage('')
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <StatusBar style='light' />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={100}
            >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <>
                            {/* <ScrollView> */}
                            <ScrollView ref={ref => {this.scrollView = ref}} onContentSizeChange={()=>this.scrollView.scrollToEnd({animated:true})}>
                                {/* <View style={styles.receiverMsg}>
                                        <Text style={styles.receiverName} >{messages[0].data.displayName}</Text>
                                        <Text style={styles.receiverText} >{messages[0].data.message}</Text>
                                </View> */}
                                {/* {messages.map((msg)=>{
                                    msg.data.email === auth.currentUser.email ? (
                                        <View key={msg.id} style={styles.receiverMsg}>
                                            <Text style={styles.receiverName} >{msg.data.displayName}</Text>
                                            <Text style={styles.receiverText} >{msg.data.message}</Text>
                                        </View>
                                    ) : (
                                        <View key={msg.id} style={styles.senderMsg}>
                                            <Text style={styles.senderName} >{msg.data.displayName}</Text>
                                            <Text style={styles.senderText} >{msg.data.message}</Text>
                                        </View>
                                    )
                                })} */}
                                {messages.map((msg)=>{
                                    if(msg.data.email !== auth.currentUser.email){
                                        return(
                                            <View key={msg.id} style={styles.receiverMsg}>
                                                <Text style={styles.receiverName} >{msg.data.displayName}</Text>
                                                <Text style={styles.receiverText} >{msg.data.message}</Text>
                                            </View>
                                        )
                                    } else{
                                        return(
                                            <View key={msg.id} style={styles.senderMsg}>
                                                <Text style={styles.senderText} >{msg.data.message}</Text>
                                            </View>
                                        )
                                        
                                    }
                                })}
                            </ScrollView>
                            <View style={styles.footer}>
                                <TextInput placeholder='Type your message here' style={styles.textInput} value={message} onChangeText={(text)=>setMessage(text)} onSubmitEditing={sendMessage} />
                                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                    <Icon type='ionicon' name='send' size={24} color='#2c6eed' onPress={sendMessage} />
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ECECEC',
        padding:10,
        color:'grey',
        borderRadius:30
    },
    receiverMsg:{
        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-start',
        borderRadius:20,
        marginLeft:15,
        marginTop:10,
        marginBottom:10,
        maxWidth:'80%',
        position:'relative'
    },
    receiverName:{
        color:'#2c6eed'
    },
    receiverText:{},
    senderMsg:{
        padding:15,
        backgroundColor:'#2c6eed',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:10,
        marginTop:10,
        maxWidth:'80%',
        position:'relative'
    },
    senderText:{
        color:'white'
    }
})
