import React from 'react'
import { Text,TouchableOpacity,View } from 'react-native'
import styles from './StackCard.style'

const StackCard = ({data}) => {
    return(
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.text.title_Text}>{data.item}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default StackCard