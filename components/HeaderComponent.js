import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebaseConfig'

const HeaderComponent = () => {

    // const userName = auth.currentUser.displayName

    return (
        <View style={{marginLeft:20}}>
            <Avatar rounded source={require('../assets/logo.png')} />
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({})
