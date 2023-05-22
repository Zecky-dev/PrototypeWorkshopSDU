import { StyleSheet,Dimensions } from 'react-native'

export default StyleSheet.create({
    container:{

    },
    FAB:{
        position: 'absolute',
        right: 16,
        bottom: 16,
    },
    modal:{
        margin: 0, 
        alignItems: 'center', 
        justifyContent: 'flex-end' 
    },
    modal_view: {
        paddingVertical: 16,
        minHeight: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    text:{
        text_input: {
            width:'80%'
        },

    }
})