import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react'
import { View, FlatList, Alert } from 'react-native'
import styles from './HomePage.style'

import { FAB } from 'react-native-elements';
import SearchBar from '../../components/SearchBar/SearchBar';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import StackCard from '../../components/StackCard/StackCard'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import colors from '../../utils/colors';

import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { getFirebaseFirestoreErrorMessage } from '../../utils/functions'

import MaterialCard from '../../components/MaterialCard/MaterialCard';


const HomePage = ({ navigation, route }) => {

    const userType = route.params.userType;

    const [modalVisibility, setModalVisibility] = useState(false)
    const [rooms, setRooms] = useState([]);
    const [title, setTitle] = useState('');

    //search kısmı için gerekli stateler
    const [searchText, setSearchText] = useState('')
    const [allMaterials, setAllMaterials] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    //search
    const handleSearch = async (searchText) => {
        setSearchText(searchText)
        try {
            if (searchText.length === 0) {
                setIsSearching(false)
            }
            else {
                setIsSearching(true)
                setFilteredMaterials(allMaterials.filter(item => item.materialName.toLowerCase().includes(searchText.toLowerCase())))
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    function onResult(QuerySnapshot) {
        const documents = QuerySnapshot.docs;
        const rooms = [];
        for (let document of documents) {
            rooms.push({ id: document._ref._documentPath._parts[1], title: document._data.title });
        }

        const materials = [];
        firestore().
            collection('Rooms').
            get().
            then(
                snapshot => snapshot.docs.map(doc => {
                    if (doc.data().materials && doc.data().materials.length > 0) {
                        materials.push(...doc.data().materials)
                    }
                }))
        setAllMaterials(materials);
        setRooms(rooms);
    }

    function onError(error) {
        showMessage({
            message: getFirebaseFirestoreErrorMessage(error),
            type: "danger"
        })
    }

    useEffect(() => {
        const rooms = firestore().collection('Rooms');
        rooms.orderBy('title').onSnapshot(onResult, onError);
    }, [])

    useEffect(() => {
        handleSearch(searchText)
    }, [allMaterials])

    // Oda silme
    const onRoomLongPress = (id) => {
        const removeRoom = (id) => {
            firestore().collection('Rooms').doc(id).delete().then(() => {

            })
        }
        Alert.alert('Dolabı Kaldır', 'Dolabı kaldırmak istediğinize emin misiniz ?', [
            {
                text: 'İptal et',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Kaldır', onPress: () => removeRoom(id) },
        ]);
    }

    // Oda ekleme
    const addRoom = (roomTitle) => {
        setModalVisibility(!modalVisibility)
        firestore()
            .collection('Rooms')
            .add({
                title: roomTitle.toUpperCase()
            })
            .then(() => console.log("Successfully added"))
    }

    const renderStackCard = ({ item }) =>
        <StackCard
            data={item}
            onLongPress={userType === "superVisor" ? () => onRoomLongPress(item.id) : null}
            navigation={navigation}
            allMaterials={allMaterials} />

    const renderMaterialCard = ({ item }) =>
        <MaterialCard
            data={item}
            isSearching={true}
            onPress={() => navigation.navigate('Details', { title: item.roomTitle, id: item.roomID })}
        />

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder='Ara...'
                onChangeText={handleSearch}
                value={searchText}
                
            />
            {!isSearching ? <FlatList
                key={'0'}
                numColumns={2}
                data={rooms}
                renderItem={renderStackCard}
                keyExtractor={(item) => item.id}
            /> : <FlatList
                key={'1'}
                data={filteredMaterials}
                renderItem={renderMaterialCard}
                keyExtractor={(item) => item.materialID}
            />}

            {userType === 'superVisor' ? <FAB
                style={styles.FAB}
                size='large'
                color='gray'
                icon={
                    <Icon
                        name='add'
                        color={'black'}
                        size={24}
                    />
                }
                onPress={() => setModalVisibility(!modalVisibility)}
            /> : null}
            <Modal style={styles.modal}
                isVisible={modalVisibility}
                useNativeDriver
                onBackButtonPress={() => setModalVisibility(!modalVisibility)}
                onBackdropPress={() => setModalVisibility(!modalVisibility)}
            >
                <View
                    style={styles.modal_view}>
                    <CustomTextInput
                        placeholder={'Dolap ismi giriniz...'}
                        additionalStyles={styles.text.text_input}
                        type='text'
                        onChangeText={setTitle}
                    />
                    <FAB
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}
                        size='large'
                        color={colors.white}
                        icon={
                            <Icon
                                name='add'
                                color={'black'}
                                size={24}
                            />
                        }
                        onPress={() => addRoom(title)}
                    />
                    <View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default HomePage;