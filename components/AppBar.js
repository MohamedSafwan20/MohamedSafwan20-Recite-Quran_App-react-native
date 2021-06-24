import React, {useState} from 'react';
import {View, Text, Animated, Dimensions} from 'react-native';
import {Header, Icon, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '../screens/DrawerItems';

const AppBar = props => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  let value = useState(new Animated.Value(-width))[0];
  const darkMode = useSelector(state => state.darkModeReducer);
  const dispatch = useDispatch();

  const openAnimation = () => {
    Animated.timing(value, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeAnimation = () => {
    Animated.timing(value, {
      toValue: -width,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Header
        placement="left"
        backgroundColor="#3bd627"
        leftComponent={
          <Button
            onPress={openAnimation}
            type="clear"
            icon={<Icon name="menu" type="SimpleLineIcons" color="white" />}
          />
        }
        centerComponent={
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: '2%',
            }}>
            Recite Quran
          </Text>
        }
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={() => dispatch({type: 'CHANGE', payload: !darkMode})}
              type="clear"
              icon={<Icon name="brightness-medium" color="white" />}
            />
          </View>
        }
      />

      {/* Drawer */}
      <Animated.View
        style={{
          zIndex: 90,
          backgroundColor: darkMode ? 'black' : 'white',
          flex: 1,
          width: '75%',
          height: height,
          position: 'absolute',
          borderTopEndRadius: 50,
          borderBottomEndRadius: 30,
          transform: [{translateX: value}],
        }}>
        <View style={{height: '5.8%'}}></View>
        <Button
          onPress={closeAnimation}
          buttonStyle={{
            top: 0,
            width: 50,
            alignSelf: 'flex-end',
            backgroundColor: '#3bd627',
          }}
          icon={<Icon name="close" color="white" />}
        />
        <Drawer />
      </Animated.View>
    </View>
  );
};

export default AppBar;
