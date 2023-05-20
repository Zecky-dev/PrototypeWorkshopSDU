import React, { useState } from 'react'
import { ScrollView,View,Text,Image } from 'react-native'
import Modal from 'react-native-modal'
import styles from './MaterialModal.style'
import CustomTextInput from '../CustomTextInput/CustomTextInput'
import {Picker} from '@react-native-picker/picker';

export default function({isVisible,setVisible,info}) {
    const [pickerValue,setPickerValue] = useState("1") 

    const optionList = ['1','2','3','4','5','6','7','8','9','10']
    const handleChange = (PickedValue) => {
        setPickerValue(PickedValue)
    }
    return(
        <Modal 
        style={styles.container}
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(!isVisible)}
        onBackdropPress={() => setVisible(!isVisible)}
        >
            <ScrollView style={styles.modal_view} >
                <View style={styles.image_container}>
                    <Image
                        source={require('../../assets/images/matkap.jpg')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.inputArea}>
                    {info ? null : <Text style={styles.text}>Ürün adı</Text>}
                    <CustomTextInput
                        info={info}
                        additionalStyles={styles.text_input}

                    />

                    {info ? null : <Text style={styles.text}>Ürün adedi</Text>}
                    <Picker
                        style={styles.picker}
                        mode='dropdown'
                        selectedValue={pickerValue}
                        onValueChange={(PickedValue) => handleChange(PickedValue)}
                        enabled={!info}
                    >
                        {
                            optionList.map((item, index) => <Picker.Item label={item} value={item} key={index} />)
                        }
                    </Picker>

                    {info ? null : <Text style={styles.text}>Ürün açıklaması</Text>}
                    <CustomTextInput
                        additionalStyles={styles.text_input}
                        info={info}
                        multiline={true}
                    />
                </View>                
            </ScrollView>
        </Modal>
    )
}