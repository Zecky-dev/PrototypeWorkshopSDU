import React from 'react';
import { TouchableOpacity,Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './CustomButton.style';

const CustomButton = ({icon,label,onPress,loading,additionalStyles}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container,additionalStyles?.container]} activeOpacity={.7}>
            {icon && !loading ? <Icon style={styles.icon} name={icon.name} size={icon.size} color={icon.color}/> : null}
            {loading ? <ActivityIndicator size="small"/> : null}
            {!loading ? (<Text style={[styles.label,additionalStyles?.label]}>{label}</Text>) : null}
        </TouchableOpacity>
    )
}

export default CustomButton;