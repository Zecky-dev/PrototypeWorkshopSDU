import React,{useState,useEffect} from 'react'
import { Alert, FlatList, Text,View } from 'react-native'
import { Button, FAB, SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './StackDetails.styles'

import MaterialCard from '../../components/MaterialCard2/MaterialCard';
import MaterialModal from '../../components/MaterialModal2/MaterialModal'


import firestore from '@react-native-firebase/firestore'

const StackDetails = ({route}) => {
    const [modalVisible,setModalVisible] = useState(false);
    const [modalType,setModalType] = useState("");
    
    const {id,title} = route.params;


    const [materials,setMaterials] = useState([]);
    const [material,setMaterial] = useState();

  
    // Odadaki bütün materyalleri getirme ve flatlist'e geçme
        useEffect(() => {
            const subscriber = firestore()
            .collection('Rooms')
            .doc(id)
            .onSnapshot(documentSnapshot => {
                setMaterials(documentSnapshot.data().materials)
            })
            return () => subscriber()
        },[id] )
    
    // Odadan istenilen materyali uzun basılı tutup silme
    const removeMaterial = async (roomID,materialID) => {
        try {
            const documentRef = firestore().collection('Rooms').doc(roomID);
            const documentSnapshot = await documentRef.get();

            if(documentSnapshot.exists) {
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
        catch(error) {
            console.log("Belirtilen döküman bulunamadı")
        }
    }

    const setClickedMaterial = async (roomID,materialID) => {
        const materials = (await firestore().collection('Rooms').doc(roomID).get()).data().materials
        const clickedMaterial = materials.filter(material => material.materialID === materialID);
        setModalVisible(!modalVisible);
        setMaterial(clickedMaterial);
    }   





    return (
      <View style={styles.container}>
        <SearchBar />

        <FlatList
          data={materials}
          renderItem={({item}) => (
            <MaterialCard
              data={item}
              onPress={() => {
                setModalType('preview');
                setClickedMaterial(id, item.materialID);
              }}
              removeMaterial={() => removeMaterial(id, item.materialID)}
              editMaterial={() => {
                setModalVisible(!modalVisible);
                setModalType('edit');
                setClickedMaterial(id, item.materialID);
              }}
            />
          )}
        />

        <FAB
          style={styles.FAB}
          size="large"
          color="gray"
          icon={<Icon name="add" color={'black'} size={24} />}
          onPress={() => {
            setModalType('add');
            setModalVisible(!modalVisible);
          }}
        />

        <MaterialModal
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={{id, title, ...material}}
          type={modalType}
        />
      </View>
    );
}

export default StackDetails