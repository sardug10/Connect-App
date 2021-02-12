import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Image, Button, Input } from "react-native-elements";
import { auth, db } from '../firebaseConfig';
import defaultAvatar from '../assets/default-avatar.jpg';

const RegisterScreen = ({navigation}) =>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [imgUrl,setImgUrl] = useState('')

   useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:'Login',
            headerTitleStyle:{
                alignSelf:'flex-start',
                marginLeft:130
            },
            headerTintColor:'#fff'
        })
   }, [navigation])

    const register = ()=>{
        // if(name === undefined || email === undefined || password === undefined){
        //     alert('Please fill all the fields.')
        // }
        // if(password.length <= 8){
        //     alert('Password must be 8 characters long')
        // }

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name
            })
            // authUser.user.uid
            // createUserCollection(authUser)
        })
        .catch((Exception)=> alert(Exception.message))
    }

    // const createUserCollection = async(authUser)=>{
    //     try {
    //         await db.collection('users').add({
    //             user:authUser.user.uid,
    //             chat:[]
    //         })
    //     } catch (error) {
    //         alert(error)
    //     }
        
    // }

    return(
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text h3 style={{marginBottom:25, textAlign:'center', marginTop:50, fontSize:25,color:'#000'}}>
                Create an Account
            </Text>

            {/* <Image source={require('../assets/logo.png')}
            style={{
                height:250,
                width:250,
                marginLeft:105,
                marginTop:50,
                borderRadius:20
            }}
            /> */}

            <View style={styles.inputContainer}>
                <Input placeholder='Create a username' autoFocus type='text' value={name} onChangeText={(text)=>setName(text)} />
                <Input placeholder='Enter your E-Mail' type='email' value={email} onChangeText={(text)=>setEmail(text)} />
                <Input placeholder='Create a Password' type='password' secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} />
                {/* <Input placeholder='Image URL (optional)' type='text' value={imgUrl} onChangeText={(text)=>setImgUrl(text)} onSubmitEditing={register} /> */}
            </View>

            <Button raised onPress={register} disabled={true ? !name || !email || !password : false} containerStyle={styles.button} title='Register'/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;
const styles = StyleSheet.create({
    inputContainer:{
        marginTop:100,
        width:'80%',
        marginLeft:'10%'
    },
    button:{
        width:'60%',
        marginLeft:'20%',
        marginTop:25
    }
})

