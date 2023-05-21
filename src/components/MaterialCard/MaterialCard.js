import React,{useEffect} from 'react';
import {View,Text,Image, TouchableOpacity} from 'react-native';

import styles from './MaterialCard.style';
import CustomButton from '../CustomButton/CustomButton';
import colors from '../../utils/colors';

import firestore from '@react-native-firebase/firestore';

const MaterialCard = ({data,onPress,removeMaterial,editMaterial,isSearching}) => {

  // Düzenle butonuna basıldığında, material modal'a roomID'si ve materialID'si geçilmeli.

    return (
      <TouchableOpacity style={styles.container} activeOpacity={.7} onPress={onPress}>

        <View style={styles.infoContainer}>
          <Image
            source={require('../../assets/images/matkap.jpg')}
            style={styles.image}
          />
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
        {!isSearching?<View style={styles.buttonContainer}>
            <CustomButton
                label="Düzenle"
                onPress={editMaterial}
                additionalStyles={{
                    container: {
                        flex:1,
                        borderRadius: 0,
                        backgroundColor: colors.orange
                    }
                }}
            />
          <View style={{width: 8}} />
            <CustomButton
                label="Kaldır"
                additionalStyles={{
                    container: {
                        flex: 1,
                        borderRadius: 0,
                        backgroundColor: colors.passive
                    }
                }}
                onPress={removeMaterial}
            />
        </View>:null}
        
      </TouchableOpacity>
    );
}

export default MaterialCard;