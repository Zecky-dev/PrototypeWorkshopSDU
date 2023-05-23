import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './MaterialCard.style';
import CustomButton from '../CustomButton/CustomButton';
import colors from '../../utils/colors';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

const MaterialCard = ({ data, onPress, removeMaterial, editMaterial, isSearching, userType, takeMaterial, giveBackMaterial }) => {

  // Düzenle butonuna basıldığında, material modal'a roomID'si ve materialID'si geçilmeli.

  console.log(data)

  return (
    <TouchableOpacity style={styles.container} activeOpacity={.7} onPress={onPress}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer} >
          <Image
            source={{ uri: data.materialImageURL }}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer} >
          <View style={styles.middleContainer}>
            <Text style={styles.name}>{data.materialName}</Text>
            <Text style={styles.cupboard}>Dolap: {data.roomTitle}</Text>
          </View>
          <Text
            style={
              data.materialAvailable
                ? styles.available.active
                : styles.available.passive
            }>
            {data.materialAvailable ? 'Kullanılabilir' : 'Kullanılamaz'}
          </Text>
        </View>

      </View>
      {
        !isSearching ? <View style={styles.buttonContainer}>
          <CustomButton
            label={userType === 'superVisor' ? "Düzenle" : 'Aleti Al'}
            additionalStyles={{
              container: {
                flex: 1,
                borderRadius: 4,
                backgroundColor: colors.orange
              }
            }}
            isAvailable={userType !== 'superVisor' && data.materialUnit === '0'}
            onPress={userType === 'superVisor' ? editMaterial : takeMaterial}
          />
          <View style={{ width: 8 }} />
          <CustomButton
            label={userType === 'superVisor' ? "Kaldır" : 'Geri Bırak'}
            additionalStyles={{
              container: {
                flex: 1,
                borderRadius: 4,
                backgroundColor: colors.passive
              }
            }}
            onPress={userType === 'superVisor' ? removeMaterial : giveBackMaterial}
          />
        </View> : null
      }

    </TouchableOpacity >
  );
}

export default MaterialCard;