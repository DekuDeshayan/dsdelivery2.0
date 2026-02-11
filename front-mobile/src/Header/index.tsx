import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAutoTranslate } from '../utils/AutoTranslateContext';
import LanguagePicker from '../utils/LanguagePicker';

type RootStackParamList = {
  Home: undefined;
};

export default function Header() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { t } = useAutoTranslate();
    
    const handleOnPress = () => {
        navigation.navigate('Home');
    }
    
  return (
    <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} />
            <Text style={styles.text}>{t('DS Delivery')}</Text>
            <LanguagePicker />
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#DA5C5C',
    width: '100%',
    height: 100,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 13,
   },
   text: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#FFF',
    fontFamily: 'OpenSans_700Bold'
   }
});