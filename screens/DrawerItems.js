import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

function DrawerItems(props) {
  const [surah, setSurah] = useState([]);
  const [searchedSurah, setSearchedSurah] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchedSurahValue, setSearchedSurahValue] = useState(null);
  const dispatch = useDispatch();
  let [numberOfAyahs, setNumberOfAyahs] = useState(null);

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

  const searchSurahByName = () => {
    if (searchedSurahValue !== null) {
      fetch(`http://api.alquran.cloud/v1/surah/${searchedSurahValue}`)
        .then(res => res.json())
        .then(data => {
          dispatch({type: 'UPDATE', payload: data.data});
          setSearchedSurah(data.data);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  const goToAyah = value => {
    if (value !== null) {
      fetch(
        `http://api.alquran.cloud/v1/surah/${searchedSurahValue}?offset=${
          value - 1
        }`,
      )
        .then(res => res.json())
        .then(data => {
          dispatch({type: 'UPDATE', payload: data.data});
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>
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
        value={searchedSurahValue}
        items={surah}
        setOpen={setOpen}
        setValue={setSearchedSurahValue}
        onChangeValue={searchSurahByName}
      />
      <Picker
        onFocus={() => {
          setNumberOfAyahs([
            ...Array(
              searchedSurah?.numberOfAyahs ? searchedSurah.numberOfAyahs : 0,
            ),
          ]);
        }}
        style={{
          marginTop: 15,
          width: '80%',
          alignSelf: 'center',
        }}
        onValueChange={goToAyah}>
        <Picker.Item
          label="Go to Ayah"
          value={null}
          enabled={false}
          style={{color: 'grey', fontSize: 20}}
        />
        {numberOfAyahs?.map((item, index) => (
          <Picker.Item
            style={{fontSize: 20, color: 'black'}}
            label={(index + 1).toString()}
            value={(index + 1).toString()}
            key={index.toString()}
          />
        ))}
      </Picker>
    </View>
  );
}

export default DrawerItems;
