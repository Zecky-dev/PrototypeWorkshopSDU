import React from 'react'
import { Text,TouchableOpacity,View } from 'react-native'
import styles from './StackCard.style'

const StackCard = ({data,onLongPress,navigation}) => {
    return(
        <TouchableOpacity onLongPress={onLongPress} onPress={() => navigation.navigate('Details',data)}>
            <View style={styles.container}>
                <Text style={styles.text.title_Text}>{data.title}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default StackCard