import 'react-native-get-random-values';
import React,{useState} from 'react'
import { View,FlatList, Alert } from 'react-native'
import styles from './HomePage.style'

import { FAB, SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import  Icon  from 'react-native-vector-icons/Ionicons';

import StackCard from '../../components/StackCard/StackCard'
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import colors from '../../utils/colors';

import { sortRooms } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';

const HomePage = ({navigation}) => {
    const [modalVisibility, setModalVisibility] = useState(false)
    const [rooms,setRooms] = useState([]);
    const [title,setTitle] = useState('');

    const onRoomLongPress = (id) => {

        const removeRoom = (id) => {
            const filteredRooms = rooms.filter(room => room.id !== id)
            setRooms(sortRooms(filteredRooms))
        }
        Alert.alert('Dolabı Kaldır', 'Dolabı kaldırmak istediğinize emin misiniz ?', [
            {
              text: 'İptal et',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Kaldır', onPress: () => removeRoom(id)},
          ]);
    }
    
    const addRoom = (roomTitle) => {
        setModalVisibility(!modalVisibility)
        setRooms(sortRooms([...rooms,{id: uuidv4(),title:roomTitle}])); 
    }

    return (
        <View style={{ flex: 1 }}>
            <SearchBar

            />
            <FlatList
                numColumns={2}
                data={rooms}
                renderItem={({item}) => <StackCard data={item} onLongPress={() => onRoomLongPress(item.id)} navigation={navigation}/>}        
                keyExtractor={(item) => item.id}
            />
            <FAB
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
            />
            <Modal style={styles.modal}
                isVisible={modalVisibility}
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
                        style={{justifyContent:'center',alignItems:'center'}}
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