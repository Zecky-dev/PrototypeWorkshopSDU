import React from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './SearchBar.style'

const SearchBar = ({ placeholder, onChangeText, value }) => {
    return (
        <View style={styles.container} >
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='black'
                value={value}
                onChangeText={onChangeText}
                style={styles.input} />
            <Icon name='md-search-sharp' size={32} style={styles.icon} />
        </View>
    )
}

export default SearchBar