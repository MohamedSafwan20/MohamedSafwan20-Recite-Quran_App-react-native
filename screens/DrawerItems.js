import React, {useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';

function DrawerItems(props) {
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
          borderRadius: 40,
        }}
      />
    </View>
  );
}

export default DrawerItems;
