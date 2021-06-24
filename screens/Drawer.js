import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Icon} from 'react-native-elements';

function Drawer(props) {
  const [surah, setSurah] = useState();

  return (
    <View>
      <SearchBar
        onSubmitEditing={() => console.log('sun')}
        onChangeText={setSurah}
        value={surah}
        placeholder="Enter Surah"
        round={true}
        inputContainerStyle={{backgroundColor: '#f7f7f7'}}
        containerStyle={{
          marginTop: '3%',
          backgroundColor: 'white',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
      />
    </View>
  );
}

export default Drawer;
