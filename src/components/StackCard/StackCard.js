import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './StackCard.style'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const StackCard = ({ data, onLongPress, navigation }) => {
    const [sumMaterial, setSumMaterial] = useState(0)

    useEffect(() => {
        const fun = async () => {
            try {
                const documentRef = firestore().collection('Rooms').doc(data.id);
                const documentSnapshot = ((await documentRef.get()).data().materials);
                const filteredRoom = documentSnapshot.filter(item => item.roomID === data.id)
                setSumMaterial(filteredRoom.length)
            } catch (error) {
                console.log(error.message)
            }
        }
        fun()
    }, [])
    return (
        <TouchableOpacity onLongPress={onLongPress} onPress={() => navigation.navigate('Details', data)}>
            <View style={styles.container}>
                <View style={styles.innerContainer} >
                    <Icon name='file-cabinet' color={'black'} size={54} />
                    <Text style={styles.text.title_Text}>{data.title}</Text>
                </View>
                <Text style={styles.text.sum_title} >{sumMaterial}</Text>
            </View>
        </TouchableOpacity >
    )
}
export default StackCard