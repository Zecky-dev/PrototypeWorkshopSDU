import React from 'react';
import { TouchableOpacity,Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './CustomButton.style';

const CustomButton = ({icon,label,onPress,loading,additionalStyle,additionalStyles}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[[styles.container,additionalStyle?.container],additionalStyles?.container]} activeOpacity={.7}>
            {icon && !loading ? <Icon style={styles.icon} name={icon.name} size={icon.size} color={icon.color} style={[styles.icon,additionalStyle?.icon]}/> : null}
            {loading ? <ActivityIndicator size="small"/> : null}
            {!loading ? (<Text style={[[styles.label,additionalStyle?.label],additionalStyles?.label]}>{label}</Text>) : null}
        </TouchableOpacity>
    )
}

export default CustomButton;