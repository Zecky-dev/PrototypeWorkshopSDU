import React from 'react';
import {TextInput,View}  from 'react-native';
import styles from './CustomTextInput.style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTextInput = ({placeholder,type,onChangeText,additionalStyles,secret,icon,onChangeText,info,multiline}) => {
    return (
      <View style={[styles.container,additionalStyles]}>
        {icon ? <Icon name={icon?.name} size={icon?.size} color={icon?.color}/> : null}
        <TextInput
          secureTextEntry={secret}
          placeholder={placeholder}
          onChangeText={onChangeText}
          clearButtonMode="while-editing"
          inputMode={type}
          onChangeText={onChangeText}
          editable={info===true?false:true}
          multiline={multiline}
          style={[{padding:8,flex:1,},additionalStyles]}
          
        />
      </View>
    );
}

export default CustomTextInput;