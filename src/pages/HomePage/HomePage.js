import React from 'react'
import { View, Text, FlatList } from 'react-native'
import CabinetCard from '../../components/CabinetCard'

export default () => {
    return (
        <FlatList
            data={data}
            renderItem={(item) => <CabinetCard cabinetNo={item.cabinetNo} />}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-around'}}
        />
    )
}

const data = [
    {
        cabinetNo: 14
    },
    {
        cabinetNo: 15
    },
    {
        cabinetNo: 16
    },
    {
        cabinetNo: 17
    },
    {
        cabinetNo: 18
    },
    {
        cabinetNo: 18
    }
]