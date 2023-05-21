import React, { useEffect, useState } from 'react'
import { ScrollView,View,Text,Image } from 'react-native'
import Modal from 'react-native-modal'
import styles from './MaterialModal.style'
import CustomTextInput from '../CustomTextInput/CustomTextInput'
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../CustomButton/CustomButton'
import colors from '../../utils/colors'

import {Formik} from 'formik';
import { materialValidationSchema } from '../../utils/validations'
import firestore from '@react-native-firebase/firestore';
import {getFirebaseFirestoreErrorMessage} from '../../utils/functions'
import { showMessage } from 'react-native-flash-message'

import {v4 as uuidv4} from 'uuid';

export default function({isVisible,setVisible,info,type,data}) {
    const optionList = ['1','2','3','4','5','6','7','8','9','10']

    const [loading,setLoading] = useState(false);
   
    console.log(data)

    // Bulunulan odaya yeni materyaller ekleme
    const addMaterial = async (roomID,roomTitle,materialName,materialUnit,materialDescription) => {
        const material = {roomTitle,materialID: uuidv4() ,materialName,materialUnit,materialDescription,materialAvailable:true};
        try {
            setLoading(true);
            const roomRef = firestore().collection('Rooms').doc(roomID);
            await roomRef.update({
                id: roomID,
                title: roomTitle,
                materials: firestore.FieldValue.arrayUnion(material)
            })
            setLoading(false);
            setVisible(!isVisible)
        }
        catch(err) {
            showMessage({
                message: getFirebaseFirestoreErrorMessage(err),
                type: "danger"
            })
            setLoading(false);
        }
    }

    if(!data) {
        return;
    }
        
    return(
        <Modal 
        style={styles.container}
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(!isVisible)}
        onBackdropPress={() => setVisible(!isVisible)}
        >
            <ScrollView style={styles.modal_view} showsVerticalScrollIndicator={false}>
                <View style={styles.image_container}>
                    <Image
                        source={require('../../assets/images/matkap.jpg')}
                        style={styles.image}
                />
            </View>


            <Formik
                initialValues={{materialName: data.materialName, materialUnit: data?.materialUnit, materialDescription: data?.materialDescription}}
                validationSchema={materialValidationSchema}
                onSubmit={
                    type
                    ?(values) => addMaterial(data.id,data.title,values.materialName,values.materialUnit,values.materialDescription)
                    : (values) => updateMaterial(values.materialName,values.materialUnit,values.materialDescription) }
                
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={info?styles.inputAreaInfo:styles.inputArea}>
                    {info ? null : <Text style={styles.text}>Ürün adı</Text>}
                    
                    <CustomTextInput
                        info={info}
                        additionalStyles={styles.text_input}
                        value={values.materialName}
                        onChangeText={handleChange('materialName')}
                    />

                    {info ? null : <Text style={styles.text}>Ürün adedi</Text>}
                    
                    <Picker
                        style={styles.picker}
                        mode='dropdown'
                        selectedValue={values.materialUnit}
                        onValueChange={handleChange('materialUnit')}
                        enabled={!info}>
                        {
                            optionList.map((item, index) => <Picker.Item label={item} value={item} key={item} />)
                        }
                    </Picker>

                    {info ? null : <Text style={styles.text}>Ürün açıklaması</Text>}
                    <CustomTextInput
                        additionalStyles={styles.text_input}
                        value={values.materialDescription}
                        info={info}
                        multiline={true}
                        onChangeText={handleChange('materialDescription')}
                    />
                    {!info && <View style={styles.button_container}>
                        <CustomButton
                            additionalStyles={styles.btn}
                            label={type ? 'Ekle' : 'Düzenle'}
                            onPress={handleSubmit}
                            icon={{
                                name: type ? 'plus' : 'book-edit',
                                color: colors.black,
                                size: 36
                            }}
                        />
                    </View>}
                </View> 
                )}
            </Formik>

                

            </ScrollView>
            
        </Modal>
    )
}