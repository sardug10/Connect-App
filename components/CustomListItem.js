import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        <ListItem key={id} bottomDivider onPress={()=>enterChat(id, chatName)}>
            <Avatar rounded size={44} source={require('../assets/default-avatar.jpg')} />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'700'}}>
                    {chatName}
                </ListItem.Title>
                {/* <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    Bhai maine stocks ka padha....merko maza hi aa gya......huye huye huye
                </ListItem.Subtitle> */}
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
