import React,{useState} from 'react';
import {TextInput,View}  from 'react-native';
import styles from './CustomTextInput.style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

const CustomTextInput = ({placeholder,type,onChangeText,additionalStyles,secret=false,icon,modalType,multiline,value}) => {
    const [passEntry,setPassEntry] = useState(secret);
  
    return (
      <View style={[styles.container,additionalStyles]}>
        {icon ? <Icon name={icon?.name} size={icon?.size} color={icon?.color}/> : null}
        <TextInput
          secureTextEntry={passEntry}
          placeholder={placeholder}
          onChangeText={onChangeText}
          clearButtonMode="while-editing"
          editable={modalType==="preview" ? false : true}
          multiline={multiline}
          value={value}
          keyboardType={type}
          style={[{padding:8,flex:1,color:colors.black},additionalStyles]}
        />
        {
          secret ? (
            <Icon
          name= {passEntry ? 'eye-off' : 'eye'}
          size= {24}
          onPress={() => setPassEntry(!passEntry)}
          style={{marginHorizontal: 8}}
          />
          )
          : null
        }
        
          
      </View>
    );
}

export default CustomTextInput;