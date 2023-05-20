import React from 'react';
import {View,Text,Image,TextInput} from 'react-native';

import styles from './LoginRegisterPage.style';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const LoginRegister = ({type}) => {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/sdu_logo.png')}  style={{width: 150, height: 150,}}/>
                    <Image source={require('../../assets/images/prototip_atolyesi_logo.png')} resizeMode='contain' style={{width: 180,height:180}}/>
                </View>
                <View style={{alignItems:'center',}}>
                    <Text style={styles.title}>{type==="register" ? "Kayıt Ol" : "Giriş Yap"}</Text>
                </View>
                <CustomTextInput
                icon={{name: "email",size:36,color:"gray"}}
                placeholder="E-mail adresiniz"
                additionalStyles={{container: {margin: 8,}}}
                />
                <CustomTextInput
                placeholder="Şifreniz"
                icon={{name: "",size:36,color:"gray"}}
                additionalStyles={{container: {margin: 8,}}}
                secret={true}
                />

                
            </View>
        )
}

export default LoginRegister;