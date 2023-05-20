import React,{useState} from 'react'
import { Text,View } from 'react-native'
import { FAB, SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './StackDetails.styles'

import MaterialModal from '../../components/MaterialModal/MaterialModal';
import MaterialCard from '../../components/MaterialCard/MaterialCard';


const StackDetails = ({route}) => {
    const {id,title} = route.params
    const [modalVisibility, setModalVisibility] = useState(false)
    
    const data = {
        materialName:'material1',
        cupboardName:'cupboard1',
        isAvailable:true,
        units:'3'
    }

    return(
        <View style={styles.container}>
            <SearchBar/>
            <MaterialCard data={data}/>
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
            <MaterialModal isVisible={modalVisibility} setVisible={setModalVisibility} type={true}/>

        </View>
    )
}

export default StackDetails