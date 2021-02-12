import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image, Button, Input } from "react-native-elements";
import { auth } from '../firebaseConfig';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = (props)=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [spinner, setSpinner] = useState(false)

    useEffect(()=>{
        setSpinner(true)
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                setSpinner(false)
                props.navigation.replace('Home')
            }
        });
        setSpinner(false)
        return unsubscribe;
    },[]);

    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email, password)
        .catch((error)=>{
            alert(error)
        })
    }

    return(
        <View>
            <StatusBar style='light' ></StatusBar>
            <Image source={require('../assets/logo.png')}
            style={{
                height:250,
                width:250,
                marginLeft:105,
                marginTop:100,
                borderRadius:20
            }}
            />
            {/* <Spinner
                visible={spinner}
                textContent={'Loading...'}
            /> */}
            <KeyboardAvoidingView style={styles.inputContainer}>
                <Input placeholder='E-Mail' autoFocus={true} type='email' value={email} onChangeText={(text)=>setEmail(text)} />
                <Input placeholder='Password' secureTextEntry={true} type='password' value={password} onChangeText={(text)=>setPassword(text)} onSubmitEditing={signIn} />
            </KeyboardAvoidingView>

            <KeyboardAvoidingView>
                <Button containerStyle={styles.button} disabled={true ? !email || !password : false} title='Login' onPress={signIn} />
                <Button onPress={()=>props.navigation.navigate('Register')} containerStyle={styles.button} title='Register' type='outline' />
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen;

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