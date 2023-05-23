import React from 'react';
import {TextInput,View}  from 'react-native';
import styles from './CustomTextInput.style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

const CustomTextInput = ({placeholder,type,onChangeText,additionalStyles,secret,icon,modalType,multiline,value}) => {
    return (
      <View style={[styles.container,additionalStyles]}>
        {icon ? <Icon name={icon?.name} size={icon?.size} color={icon?.color}/> : null}
        <TextInput
          secureTextEntry={secret}
          placeholder={placeholder}
          onChangeText={onChangeText}
          clearButtonMode="while-editing"
          editable={modalType==="preview" ? false : true}
          multiline={multiline}
          value={value}
          keyboardType={type}
          style={[{padding:8,flex:1,color:colors.black},additionalStyles]}

        />
      </View>
    );
}

export default CustomTextInput;