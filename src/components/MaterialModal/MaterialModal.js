import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity, ScrollView } from 'react-native';

import Modal from 'react-native-modal';

/* Image - title - unit - availability */

import styles from './MaterialModal.style'
import { Formik } from 'formik';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import CustomButton from '../CustomButton/CustomButton';
import colors from '../../utils/colors';
import { materialValidationSchema } from '../../utils/validations'
import { v4 as uuidv4 } from 'uuid';
import { showMessage } from 'react-native-flash-message';
import { getFirebaseFirestoreErrorMessage } from '../../utils/functions';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import * as Progress from 'react-native-progress';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const MaterialModal = ({ isVisible, setModalVisible, formVisible, setFormVisible, percent, setPercent, type, data }) => {


  const [imageURI, setImageURI] = useState(null)
  const [imageURL, setImageURL] = useState(type === "preview" || type === "edit" ? data[0]?.materialImageURL : null)

  // her data değiştiğinde image'i set et.
  useEffect(() => {
    if (type === "preview" || type === "edit")
      setImageURL(data[0]?.materialImageURL)
    else
      setImageURL(null)
  }, [data]);


  // Bulunulan odaya yeni materyaller ekleme
  const addMaterial = async (roomID, roomTitle, materialName, materialUnit, materialDescription) => {
    const materialInfo = { roomTitle, roomID, materialID: uuidv4(), materialName, materialUnit, materialDescription, materialAvailable: true };
    const ref = storage().ref(`/${roomID}/${materialInfo.materialID}`);
    if (imageURI) {
      setFormVisible(!formVisible);
      setPercent(0);
      ref.putFile(imageURI).on('state_changed', async (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(percent);
        if (percent === 100) {
          const URL = await ref.getDownloadURL();
          const material = { ...materialInfo, materialImageURL: URL };
          try {
            const roomRef = firestore().collection('Rooms').doc(roomID);
            roomRef.update({
              id: roomID,
              title: roomTitle,
              materials: firestore.FieldValue.arrayUnion(material)
            }).then(() => {
              console.log("eklendi")
            }).catch((error) => {
              showMessage({ message: error.message, type: 'danger' })
            })
            setModalVisible(!isVisible)
            setFormVisible(true);
          }
          catch (err) {
            console.log(err)
            showMessage({
              message: getFirebaseFirestoreErrorMessage(err),
              type: "danger"
            })
            setModalVisible(!isVisible);
          }
        }
      });
    }
    else
      showMessage({ message: 'Fotoğraf eklenmesi zorunludur.', type: 'danger' })
  }

  // Bulunulan odadaki materyali güncelleme
  const editMaterial = async (roomID, materialID, materialName, materialUnit, materialDescription, materialAvailable) => {
    const ref = storage().ref(`${roomID}/${materialID}`)
    if (imageURI) {
      setFormVisible(!formVisible);
      ref.putFile(imageURI).on('state_changed', async (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(percent);
        if (percent === 100) {
          const URL = await ref.getDownloadURL();
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
                  materialImageURL: URL,
                };

                const updatedMaterials = [
                  ...materialsWithoutUpdateElement,
                  updateElement
                ];

                await documentRef.update({ materials: updatedMaterials });
              } else
                console.log("Güncellenmek istenen öğe bulunamadı.");
            }
          } catch (err) {
            console.log(err);
          }
          setModalVisible(!isVisible)
          setFormVisible(true)
          setPercent(0);
        }
      });
    }
    else if (imageURL) {
      setFormVisible(!formVisible);
      setPercent(0);
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
              materialImageURL: imageURL || updateElement.materialImageURL,
            };

            const updatedMaterials = [
              ...materialsWithoutUpdateElement,
              updateElement
            ];

            await documentRef.update({ materials: updatedMaterials });
            setModalVisible(!isVisible);
          } else
            console.log("Güncellenmek istenen öğe bulunamadı.");
        }
      } catch (err) {
        console.log(err);
      }
      setModalVisible(!isVisible)
      setFormVisible(true)
      setPercent(0);
    }
    else
      showMessage({ message: 'Fotoğraf eklenmesi zorunludur.', type: 'danger' })
  }

  const takePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        cameraType: 'back',
      });
      setImageURI(result.assets[0].uri);
    }
    catch (error) {
      console.log("Fotoğraf çekilmedi");
    }

  }

  const takeImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      })
      setImageURI(result.assets[0].uri);
    }
    catch (error) {
      console.log("Fotoğraf seçilmedi");
    }

  }



  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={formVisible ? () => setModalVisible(!isVisible) : null}
      onBackdropPress={formVisible ? () => setModalVisible(!isVisible) : null}
      animationIn={'slideInRight'}
      animationOut={'slideOutLeft'}
      useNativeDriver>
      <View style={styles.container}>
        <Formik
          initialValues={type === 'add' ? {
            materialName: '',
            materialUnit: 0,
            materialDescription: '',
            materialAvailable: ''
          }
            : {
              materialName: data['0'] ? data['0'].materialName : '',
              materialUnit: data['0'] ? data['0'].materialUnit : 1,
              materialDescription: data['0']
                ? data['0'].materialDescription
                : '',
              materialAvailable: data['0']?.materialAvailable === true ? "+" : "-",
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
          {({ handleChange, handleBlur, handleSubmit, values }) => {
            if (!formVisible)
              return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                  <Progress.Circle size={200} progress={percent} fill='rgba(000,000,000,0)' showsText />
                </View>
              )
            else {
              return (
                <ScrollView style={styles.innerContainer}>
                  <View style={styles.imageAddContainer}>
                    <View style={{ alignItems: 'center' }}>
                      <Image source={imageURI ? { uri: imageURI } : imageURL ? { uri: imageURL } : require('../../assets/images/no_image.jpg')} style={styles.image} />
                    </View>
                    {type !== "preview" ? (<View style={styles.buttonContainer}>
                      <CustomButton
                        label="Kameradan Çek"
                        icon={{ name: 'camera', color: colors.white, size: 36 }}
                        additionalStyles={{ container: { borderRadius: 8, width: '49%', backgroundColor: '#6e186f' } }}
                        onPress={() => takePhoto()}
                      />

                      <CustomButton
                        label="Galeriden Seç"
                        additionalStyles={{ container: { borderRadius: 8, width: '49%', backgroundColor: '#6e186f' } }}
                        icon={{ name: 'view-gallery', color: colors.white, size: 36 }}
                        onPress={() => takeImageFromGallery()}
                      />
                    </View>) : null}

                  </View>

                  {/* material name */}
                  <View style={styles['input'].container}>
                    <Text style={styles['input'].label}>Materyal İsmi</Text>
                    <CustomTextInput
                      value={values.materialName}
                      onChangeText={handleChange('materialName')}
                      modalType={type}
                    />
                  </View>

                  {/* material unit*/}
                  <View style={styles['input'].container}>
                    <Text style={styles['input'].label}>Materyal Adeti</Text>
                    <CustomTextInput
                      value={values.materialUnit}
                      onChangeText={handleChange('materialUnit')}
                      type={'numeric'}
                      modalType={type}
                    />
                  </View>

                  {/* material unit*/}
                  <View style={styles['input'].container}>
                    <Text style={styles['input'].label}>Materyal Açıklaması</Text>
                    <CustomTextInput
                      value={values.materialDescription}
                      multiline={true}
                      onChangeText={handleChange('materialDescription')}
                      modalType={type}
                    />
                  </View>

                  {/* material unit*/}
                  {type === 'edit' ? (
                    <View style={styles['input'].container}>
                      <Text style={styles['input'].label}>
                        Materyal Kullanılabilirlik
                      </Text>
                      <View style={{ borderRadius: 8, backgroundColor: 'white' }}>
                        <Picker
                          style={{ color: 'black' }}
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
              )
            }
          }
          }
        </Formik>
      </View>
    </Modal>
  );
}

export default React.memo(MaterialModal);