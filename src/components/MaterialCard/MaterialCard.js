import React,{useState} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './MaterialCard.style'
import MaterialModal from '../MaterialModal2/MaterialModal';
import { FAB } from 'react-native-elements'

import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

const MaterialCard = ({data,onPress,onLongPress}) => {
    const [infoModalVisibility,setInfoModalVisibility] = useState(false)
    const [editModalVisibility,setEditModalVisibility] = useState(false)

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress} onLongPress={onLongPress}>
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
                        { backgroundColor: data.materialAvailable ? 'green' : 'red' },
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
        </TouchableOpacity>
    )
};

export default MaterialCard