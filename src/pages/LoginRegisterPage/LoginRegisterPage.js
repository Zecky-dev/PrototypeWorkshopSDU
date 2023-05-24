import React,{useState} from 'react';
import {View,Text,Image,TextInput} from 'react-native';

import styles from './LoginRegisterPage.style';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import colors from '../../utils/colors';

import {Formik} from 'formik';
import {authValidationSchema} from '../../utils/validations'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getFirebaseAuthErrorMessage, getFirebaseFirestoreErrorMessage } from '../../utils/functions';
import { showMessage } from 'react-native-flash-message';

const LoginRegister = ({type}) => {
      const [loading,setLoading] = useState(false);
        
        const register = (values) => {
            const {email,password} = values;
            const docID = email.split('@')[0];
            setLoading(true);
            firestore()
            .collection('Users')
            .doc(docID)
            .set({email,userType: "default"})
            .then(
              () => {
                auth()
                .createUserWithEmailAndPassword(email,password)
                .then(() => {
                  setLoading(false);
                })
                .catch(error => {
                  setLoading(false);
                  const errorMessage = getFirebaseAuthErrorMessage(error.code)
                  showMessage({
                    message: errorMessage,
                    type: "warning",
                  });
                })
      
              }
            )
            .catch((error) => {
              showMessage({
                message: getFirebaseFirestoreErrorMessage(error),
                type: "danger",
              });
              setLoading(false);
            })
            
        }

        const login = (values) => {
          
          const {email,password} = values;
          setLoading(true);
          auth()
          .signInWithEmailAndPassword(email,password)
          .then(
            () => {
              setLoading(false)
            }
          )
          .catch(error => {
            setLoading(false);
            const errorMessage = getFirebaseAuthErrorMessage(error.code);
            showMessage({
              message: errorMessage,
              type: "warning",
            });
          })
        }



        return (
          <View style={styles.container}>
            <View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/sdu_logo.png')}
                  style={{width: 150, height: 150}}
                />
                <Image
                  source={require('../../assets/images/prototip_atolyesi_logo.png')}
                  resizeMode="contain"
                  style={{width: 180, height: 180}}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.title}>
                  {type === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}
                </Text>
              </View>

              <Formik
                initialValues={{email: '', password: '', confirmPassword: ''}}
                onSubmit={values => {
                  type === 'register' ? register(values) : login(values);
                }}
                validationSchema={authValidationSchema}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <CustomTextInput
                      icon={{name: 'email', size: 32, color: 'gray'}}
                      placeholder="E-mail adresiniz"
                      onChangeText={handleChange('email')}
                      additionalStyles={{container: {margin: 8}}}
                    />
                    {errors.email && touched.email ? (
                      <View>
                        <Text style={{color: 'red'}}>{errors.email}</Text>
                      </View>
                    ) : null}
                    <View style={{height: 16}} />
                    <CustomTextInput
                      placeholder="Şifreniz"
                      icon={{name: 'lock', size: 32, color: 'gray'}}
                      additionalStyles={{container: {margin: 8}}}
                      onChangeText={handleChange('password')}
                      secret={true}
                    />
                    {errors.password && touched.password ? (
                      <View>
                        <Text style={{color: 'red'}}>{errors.password}</Text>
                      </View>
                    ) : null}

                    {type === 'register' ? (
                      <>
                        <View style={{height: 16}} />
                        <CustomTextInput
                          placeholder="Tekrar Şifreniz"
                          icon={{name: 'lock-reset', size: 32, color: 'gray'}}
                          additionalStyles={{container: {margin: 8}}}
                          onChangeText={handleChange('confirmPassword')}
                          secret={true}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <View>
                            <Text style={{color: 'red'}}>
                              {errors.confirmPassword}
                            </Text>
                          </View>
                        ) : null}
                      </>
                    ) : null}

                    <View style={{height: 16}} />
                    <CustomButton
                      label={type === 'register' ? 'Kayıt Ol' : 'Giriş Yap'}
                      onPress={handleSubmit}
                      loading={loading}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        );
}

export default LoginRegister;