import React,{useState} from 'react'
import { Text,View } from 'react-native'
import { FAB, SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './StackDetails.styles'
import MaterialModal from '../../components/MaterialModal/MaterialModal';


const StackDetails = ({route}) => {
    const {id,title} = route.params
    const [modalVisibility, setModalVisibility] = useState(false)

    return(
        <View style={styles.container}>
            <SearchBar/>
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
            <MaterialModal isVisible={modalVisibility} setVisible={setModalVisibility} info={true}/>
        </View>
    )
}

export default StackDetails