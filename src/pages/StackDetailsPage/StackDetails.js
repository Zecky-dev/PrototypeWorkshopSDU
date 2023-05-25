import React, { useState, useEffect } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { FAB } from 'react-native-elements';
import SearchBar from '../../components/SearchBar/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './StackDetails.styles'

import MaterialCard from '../../components/MaterialCard/MaterialCard';
import MaterialModal from '../../components/MaterialModal/MaterialModal'


import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';


const StackDetails = ({ route }) => {

  //room states
  const { id, title } = route.params;

  //modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const [formVisible, setFormVisible] = useState(true);
  const [percent, setPercent] = useState(0);

  //material states
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState();

  //search states
  const [searchText, setSearchText] = useState('');

  //supervisor states
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetail = await firestore().collection('Users').doc(auth().currentUser.email.split('@')[0]).get()
      setUserType(userDetail.data().userType);
    }
    getUserDetails();
  }, [])



  //Odadaki materyalleri ismine göre arama
  const handleSearch = async (text) => {
    setSearchText(text)
    try {
      const documentRef = firestore().collection('Rooms').doc(id);
      const documentSnapshot = ((await documentRef.get()).data().materials);

      if (searchText.length === 0) {
        setMaterials(documentSnapshot)
      }
      else {
        const filteredItems = documentSnapshot.filter(item =>
          item.materialName.toLowerCase().includes(searchText.toLowerCase())
        );

        setMaterials(filteredItems)

      }
    } catch (e) {
      console.log(e.message)
    }
  };

  useEffect(() => {
    handleSearch(searchText)
  }, [searchText])

  // Odadaki bütün materyalleri getirme ve flatlist'e geçme
  useEffect(() => {
    const subscriber = firestore()
      .collection('Rooms')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        setMaterials(documentSnapshot.data().materials)
      })


    return () => subscriber()
  }, [id])

  useEffect(() => {
    if (modalType === "edit" || modalType === "preview") {
      setModalVisible(!modalVisible);
    }
  }, [material])


  // Odadan istenilen materyali uzun basılı tutup silme
  const removeMaterial = async (roomID, materialID) => {
    const ref = storage().ref(`/${roomID}/${materialID}`);
    ref.delete().then(async () => {
      try {
        const documentRef = firestore().collection('Rooms').doc(roomID);
        const documentSnapshot = await documentRef.get();

        if (documentSnapshot.exists) {
          const materialArr = documentSnapshot.get('materials');

          const updatedArr = materialArr.filter((material) => material.materialID !== materialID)
          await documentRef.update({
            materials: updatedArr
          })
          console.log("Silinme işlemi gerçekleşti")
        }
        else {
          console.log("Belirtilen döküman bulunamadı.")
        }
      }
      catch (error) {
        console.log("Belirtilen döküman bulunamadı")
      }
    }).catch((error) => {
      showMessage({ message: 'Silinirken hata meydana geldi', type: 'danger' })
    })

  }

  const setClickedMaterial = async (roomID, materialID, type) => {
    const materials = (await firestore().collection('Rooms').doc(roomID).get()).data().materials
    const clickedMaterial = materials.filter(material => material.materialID === materialID);
    setMaterial(clickedMaterial);
  }

  const takeAndGiveBack = async (roomID, materialID, type) => {
    try {
      const roomRef = firestore().collection('Rooms').doc(roomID);
      const roomSnapshot = await roomRef.get();
      const allMaterials = roomSnapshot.data().materials;

      const updateMaterial = allMaterials.find(material => material.materialID === materialID);
      const updateWithoutMaterial = allMaterials.filter(material => material.materialID !== materialID);
      if (+updateMaterial.materialUnit >= 0 && +updateMaterial.materialUnit <= +updateMaterial.maxMaterialUnit) {
        const materialUnit = +updateMaterial.materialUnit;
        const updatedMaterialUnit = type === 'take' ? materialUnit - 1 : materialUnit + 1;
        const materialAvailable = updatedMaterialUnit !== 0;

        const newMaterial = {
          ...updateMaterial,
          materialUnit: updatedMaterialUnit.toString(),
          materialAvailable: materialAvailable,
        };

        const updatedMaterials = [...updateWithoutMaterial, newMaterial];

        await roomRef.update({ materials: updatedMaterials });
      }
    } catch (error) {
      console.log("Belirtilen döküman bulunamadı", error);
    }
  };

  const renderMaterialCard = ({ item }) =>
    <MaterialCard
      data={item}
      userType={userType}
      onPress={() => {
        setModalType('preview');
        setClickedMaterial(id, item.materialID);
        setFormVisible(true)
      }}
      removeMaterial={
        () =>
          Alert.alert(
            'Eşyayı Kaldır',
            'Eşyayı kaldırmak üzeresiniz emin misiniz ?',
            [
              {
                text: 'Hayır',
                onPress: () => { },
                style: 'default',
              },
              {
                text: 'Evet',
                onPress: () => removeMaterial(id, item.materialID),
                style: 'default',
              },
            ],
            { cancelable: true }
          )
      }
      editMaterial={() => {
        setModalType('edit');
        setClickedMaterial(id, item.materialID);
      }}
      takeMaterial={() => takeAndGiveBack(id, item.materialID, 'take')}
      giveBackMaterial={() => takeAndGiveBack(id, item.materialID, 'giveback')}
    />

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Ara..."
        onChangeText={(text) => handleSearch(text)}
        value={searchText} />

      <FlatList
        data={materials}
        renderItem={renderMaterialCard}
      />

      {userType === 'superVisor' ? <FAB
        style={styles.FAB}
        size="large"
        color="gray"
        icon={<Icon name="add" color={'black'} size={24} />}
        onPress={() => {
          setModalType('add');
          setModalVisible(!modalVisible);
          setFormVisible(true);
          setPercent(0);
        }}
      /> : null}

      <MaterialModal
        isVisible={modalVisible}
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        setModalVisible={setModalVisible}
        percent={percent}
        setPercent={setPercent}
        data={{ id, title, ...material }}
        type={modalType}
        userType={userType}
      />
    </View>
  );
}

export default StackDetails