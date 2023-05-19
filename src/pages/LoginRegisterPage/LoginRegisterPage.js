import React from 'react';
import {View,Text} from 'react-native';

const LoginRegister = ({type}) => {
        return (
            <View>
                <Text>{type==="register" ? "Kayıt Ol" : "Giriş Yap"}</Text>
            </View>
        )
}

export default LoginRegister;