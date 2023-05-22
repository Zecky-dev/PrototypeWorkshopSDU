import React,{useEffect} from 'react';
import {View,Text,Image, TouchableOpacity} from 'react-native';

import styles from './MaterialCard.style';
import CustomButton from '../CustomButton/CustomButton';
import colors from '../../utils/colors';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

const MaterialCard = ({data,onPress,removeMaterial,editMaterial,isSearching,userType,takeMaterial,giveBackMaterial}) => {

  /*
  const [image,setImage] = useState(null);
  const [uploading,setUploading] = useState(false);
  
  // Materyal oluşturulurken önce materyal firestore'a yazılacak.
  // Sonrasında uploadImage fonksiyonu ile image'i upload edilecek.
  const addMaterial = async (roomID,materialID,imagePath) => {
    setUploading(true);
    const reference = storage().ref(`/${roomID}/${materialID}`);
    reference
    .putFile(imagePath) // imagePath fotoğraf çekildikten sonraki resmin local konumu
    .then(async () => {
      // Yüklendikten sonra resmin URL'si material'in materialURL field'ina geçilmeli..
      const imageURL = await storage().ref(`/${roomID}/${materialID}`).getDownloadURL();
      
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
    })
    .catch((err) => {
      console.log("Storage error:" + err.message)
      showMessage({
        message: err.message,
        type: "danger", 
      })  
    });
    
  }

  */

  






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
                label={userType==='superVisor'?"Düzenle":'Aleti Al'}
                additionalStyles={{
                    container: {
                        flex:1,
                        borderRadius: 0,
                        backgroundColor: colors.orange
                    }
                }}
                isAvailable={userType!=='superVisor' && data.materialUnit === '0'}
                onPress={userType==='superVisor'?editMaterial:takeMaterial}
            />
          <View style={{width: 8}} />
            <CustomButton
                label={userType==='superVisor'?"Kaldır":'Geri Bırak'}
                additionalStyles={{
                    container: {
                        flex: 1,
                        borderRadius: 0,
                        backgroundColor: colors.passive
                    }
                }}
                onPress={userType==='superVisor'?removeMaterial:giveBackMaterial}
            />
        </View>:null}
        
      </TouchableOpacity>
    );
}

export default MaterialCard;