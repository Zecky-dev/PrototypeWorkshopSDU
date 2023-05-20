import React,{useState} from 'react'
import { Text,View,TextInput,FlatList, Dimensions } from 'react-native'
import styles from './HomePage.style'

import { FAB, SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import  Icon  from 'react-native-vector-icons/Ionicons';

import StackCard from '../../components/StackCard/StackCard'

const HomePage = () => {
    const [modalVisibility, setModalVisibility] = useState(false)
    const [rooms,setRooms] = useState(['A1']);
    const [title,setTitle] = useState('');
    
    return (
        <View style={{ flex: 1 }}>
            <SearchBar

            />
            <FlatList
                numColumns={2}
                data={rooms}
                renderItem={(item) => <StackCard data={item} />}        
                keyExtractor={(index) => index.toString()}
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
                    style={{
                        paddingVertical:8,
                        minHeight: 100,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'blue',
                        borderTopLeftRadius:16,
                        borderTopRightRadius:16
                    }}>
                        <Text style={{fontSize:24,color:'black',fontWeight:'500'}}>Dolap ismi girin</Text>
                        <TextInput
                            style={{
                                marginVertical:16,
                                backgroundColor:'gray',
                                borderWidth:1,
                                width:'80%'
                            }}
                            onChangeText={setTitle}
                        />
                    <FAB
                        style={{justifyContent:'center',alignItems:'center'}}
                        size='large'
                        color='gray'
                        icon={
                            <Icon
                                name='add'
                                color={'black'}
                                size={24}
                            />
                        }
                        onPress={() => setRooms([...rooms,title])}
                    />
                    <View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default HomePage;