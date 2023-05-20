import React,{useState} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './MaterialCard.style'
import MaterialModal from '../MaterialModal/MaterialModal';
import { FAB } from 'react-native-elements'

import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

const MaterialCard = ({data}) => {
    const [infoModalVisibility,setInfoModalVisibility] = useState(false)
    const [editModalVisibility,setEditModalVisibility] = useState(false)

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => setInfoModalVisibility(!infoModalVisibility)}>
            <View style={styles.leftContainer}>
                <Image
                    source={require('../../assets/images/matkap.jpg')}
                    style={styles.image}
                />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.materialName}>{data.materialName}</Text>
                <Text style={styles.closetName}>{data.cupboardName}</Text>
                <View
                    style={[
                        styles.dot,
                        { backgroundColor: data.isAvailable ? 'red' : 'green' },
                    ]}
                />
            </View>
            <View>
                <FAB
                    color='red'
                    style={{borderWidth:0,}}
                    icon={
                        <Icon
                            name='book-edit'
                            size={24}
                            color={colors.black}
                        />
                    }
                    onPress={() => setEditModalVisibility(!editModalVisibility)}
                />
                </View>
            <MaterialModal isVisible={infoModalVisibility} setVisible={setInfoModalVisibility} info={true} data={data}/>
            <MaterialModal isVisible={editModalVisibility} setVisible={setEditModalVisibility} type={false} data={data}/>
        </TouchableOpacity>
    )
};

export default MaterialCard