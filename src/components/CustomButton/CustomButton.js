import React from 'react';
import { TouchableOpacity,Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './CustomButton.style';

const CustomButton = ({icon,label,onPress,loading,additionalStyles,isAvailable}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container,additionalStyles?.container]} activeOpacity={.7} disabled={isAvailable}>
            {icon && !loading ? <Icon  name={icon.name} size={icon.size} color={icon.color} style={[styles.icon,additionalStyles?.icon]}/> : null}
            {loading ? <ActivityIndicator size="small"/> : null}
            {!loading ? (<Text style={[styles.label,additionalStyles?.label]}>{label}</Text>) : null}
        </TouchableOpacity>
    )
}

export default CustomButton;