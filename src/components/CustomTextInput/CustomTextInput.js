import React from 'react';
import {TextInput,View}  from 'react-native';
import styles from './CustomTextInput.style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTextInput = ({placeholder,type,additionalStyles,secret,icon}) => {
    return (
      <View style={styles.container}>
        {icon ? <Icon name={icon?.name} size={icon?.size} color={icon?.color}/> : null}
        <TextInput
          secureTextEntry={secret}
          placeholder={placeholder}
          clearButtonMode="while-editing"
          inputMode={type}
          style={{padding:8}}
        />
      </View>
    );
}

export default CustomTextInput;