import { StyleSheet,Dimensions } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container:{
        backgroundColor: colors.orange,
        width: Dimensions.get('screen').width / 2-16,
        height: Dimensions.get('screen').height / 5,
        margin:8,
        borderRadius:8,
    },

    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 16,
        borderBottomWidth: 2,
        borderColor: 'black'
    },

    text:{
        title_Text: {
             fontSize: 54, 
             color: 'black', 
             fontWeight: '600' 
            },
        sum_title: {
            marginVertical: 8,
            color: colors.white, 
            alignSelf: 'center',
            fontSize: 32,
            fontWeight: 'bold',
        }
    }
})