import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';

function DrawerItems(props) {
  const [surah, setSurah] = useState([]);
  const [searchedSurah, setSearchedSurah] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://api.alquran.cloud/v1/meta')
      .then(res => res.json())
      .then(data => {
        setSurah(data.data.surahs.references);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const searchSurah = () => {
    if (value !== null) {
      fetch(`http://api.alquran.cloud/v1/surah/${value}`)
        .then(res => res.json())
        .then(data => {
          setSearchedSurah(data.data);
          dispatch({type: 'UPDATE', payload: data.data});
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <View style={{marginTop: 20, width: '95%', alignSelf: 'center'}}>
      <DropDownPicker
        schema={{
          label: 'englishName',
          value: 'number',
        }}
        placeholder="Select surah"
        searchPlaceholder="Search surah"
        style={{borderColor: '#3bd627'}}
        textStyle={{
          fontSize: 16,
        }}
        dropDownContainerStyle={{
          borderColor: '#3bd627',
        }}
        searchTextInputStyle={{
          borderRadius: 17,
          height: '114%',
        }}
        listItemLabelStyle={{marginLeft: 20}}
        searchable={true}
        open={open}
        value={value}
        items={surah}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={searchSurah}
      />
    </View>
  );
}

export default DrawerItems;
