import React,{useEffect} from 'react';
import {Text,Image,View, TouchableOpacity,ScrollView} from 'react-native';

import Modal from 'react-native-modal';

/* Image - title - unit - availability */

import styles from './MaterialModal.style'
import { Formik } from 'formik';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import CustomButton from '../CustomButton/CustomButton';
import colors from '../../utils/colors';
import {materialValidationSchema} from '../../utils/validations'
import {v4 as uuidv4} from 'uuid';
import { showMessage } from 'react-native-flash-message';
import { getFirebaseFirestoreErrorMessage } from '../../utils/functions';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

import {launchCamera,launchImageLibrary} from 'react-native-image-picker';


const MaterialModal = ({isVisible,setModalVisible,type,data}) => {

    
    // Bulunulan odaya yeni materyaller ekleme
    const addMaterial = async (roomID,roomTitle,materialName,materialUnit,materialDescription) => {
        const material = {roomTitle,roomID,materialID: uuidv4() ,materialName,materialUnit,materialDescription,materialAvailable:true};
        try {
            const roomRef = firestore().collection('Rooms').doc(roomID);
            await roomRef.update({
                id: roomID,
                title: roomTitle,
                materials: firestore.FieldValue.arrayUnion(material)
            })
            setModalVisible(!isVisible)
        }
        catch(err) {
            console.log(err)
            showMessage({
                message: getFirebaseFirestoreErrorMessage(err),
                type: "danger"
            })
        }
    }

    // Bulunulan odadaki materyali güncelleme
    const editMaterial = async (roomID,materialID,materialName,materialUnit,materialDescription,materialAvailable) => {
      /*
      - Tüm materyalleri çek.
      - materialID'ye sahip materyali getir
      - getirilen materyali localde güncelle
      - güncellenen materyali materyallere(firebase) set et +
      */

      try {
        const documentRef = firestore().collection('Rooms').doc(roomID);
        const documentSnapshot = await documentRef.get();
      
        if (documentSnapshot.exists) {
          const materialArr = documentSnapshot.get('materials'); 
          let materialsWithoutUpdateElement = materialArr.filter((material) => material.materialID !== materialID);
          let updateElement = materialArr.find((material) => material.materialID === materialID);
      
          if (updateElement) {
            updateElement = {
              ...updateElement,
              materialAvailable,
              materialDescription,
              materialName,
              materialUnit,
            };
      
            const updatedMaterials = [
              ...materialsWithoutUpdateElement,
              updateElement
            ];
      
            await documentRef.update({ materials: updatedMaterials });
            console.log("Öğe güncellendi.");
          } else {
            console.log("Güncellenmek istenen öğe bulunamadı.");
          }
        }
      } catch (err) {
        console.log(err);
      }
  }

    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setModalVisible(!isVisible)}
        onBackdropPress={() => setModalVisible(!isVisible)}
        animationIn={'slideInRight'}
        animationOut={'slideOutLeft'}
        useNativeDriver>
        <View style={styles.container}>
          <Formik
            initialValues={{
              materialName: data['0'] ? data['0'].materialName : '',
              materialUnit: data['0'] ? data['0'].materialUnit : 1,
              materialDescription: data['0']
                ? data['0'].materialDescription
                : '',
              materialAvailable: data['0'] ? data['0'].materialAvailable : true,
            }}
            validationSchema={materialValidationSchema}
            onSubmit={
              type === 'add'
                ? values =>
                    addMaterial(
                      data.id,
                      data.title,
                      values.materialName,
                      values.materialUnit,
                      values.materialDescription,
                    )
                : type === 'edit'
                ? values =>
                    editMaterial(
                      data.id,
                      data['0'].materialID,
                      values.materialName,
                      values.materialUnit,
                      values.materialDescription,
                      values.materialAvailable === '+' ? true : false,
                    )
                : null
            }>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <ScrollView style={styles.innerContainer}>
                <View style={styles.imageAddContainer}>
                  <View style={{alignItems:'center'}}>
                    <Image source={require('../../assets/images/matkap.jpg')} style={styles.image}/>
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      label="Kameradan Çek"
                      icon={{name: 'camera', color: colors.white, size: 36}}
                      additionalStyles={{container: {borderRadius:0,width:'49%'}}}
                      onPress={() => {
                        const takePhoto = async () => {
                          const result = await launchCamera({
                            mediaType: 'photo',
                            maxWidth: 300,
                            maxHeight: 300,
                            quality: 1,
                            cameraType: 'back',
                          });
                          console.log(result);
                        } 
                        takePhoto();
                      }}
                    />
                  
                    <CustomButton
                      label="Galeriden Seç"
                      additionalStyles={{container: {borderRadius:0,width:'49%'}}}
                      icon={{name: 'view-gallery', color: colors.white, size: 36}}
                      onPress={() => console.log('Kameradan çekiliyor')}
                    />
                  </View>
                  
                </View>

                {/* material name */}
                <View style={styles['input'].container}>
                  <Text style={styles['input'].label}>Materyal İsmi</Text>
                  <CustomTextInput
                    value={values.materialName}
                    onChangeText={handleChange('materialName')}
                  />
                </View>

                {/* material unit*/}
                <View style={styles['input'].container}>
                  <Text style={styles['input'].label}>Materyal Adeti</Text>
                  <CustomTextInput
                    value={values.materialUnit}
                    onChangeText={handleChange('materialUnit')}
                    type={'numeric'}
                  />
                </View>

                {/* material unit*/}
                <View style={styles['input'].container}>
                  <Text style={styles['input'].label}>Materyal Açıklaması</Text>
                  <CustomTextInput
                    value={values.materialDescription}
                    multiline={true}
                    onChangeText={handleChange('materialDescription')}
                  />
                </View>

                {/* material unit*/}
                {type === 'edit' ? (
                  <View style={styles['input'].container}>
                    <Text style={styles['input'].label}>
                      Materyal Kullanılabilirlik
                    </Text>
                    <View style={{borderRadius: 8, backgroundColor: 'white'}}>
                      <Picker
                        mode="dropdown"
                        selectedValue={values.materialAvailable}
                        onValueChange={handleChange('materialAvailable')}>
                        <Picker.Item label="Kullanılabilir" value="+" />
                        <Picker.Item label="Kullanılamaz" value="-" />
                      </Picker>
                    </View>
                  </View>
                ) : null}

                {type !== 'preview' ? (
                  <CustomButton
                    label={type === 'edit' ? 'Düzenle' : 'Ekle'}
                    additionalStyles={{
                      container: {
                        marginBottom: 24,
                        marginTop: 8,
                        padding: 12,
                        backgroundColor: colors.active,
                      },
                      label: {
                        fontSize: 18,
                      },
                    }}
                    onPress={handleSubmit}
                  />
                ) : null}
              </ScrollView>
            )}
          </Formik>
        </View>
      </Modal>
    );
}

export default MaterialModal;