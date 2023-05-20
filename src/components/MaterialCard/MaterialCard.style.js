import { StyleSheet,Dimensions } from 'react-native'

export default StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      },
      leftContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      rightContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 10,
      },
      materialName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      closetName: {
        fontSize: 14,
      },
      dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
      },
})