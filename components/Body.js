import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';

function Body(props) {
  const [ayahs, setAyahs] = useState();

  useEffect(() => {
    fetch('http://api.alquran.cloud/v1/surah/2')
      .then(res => res.json())
      .then(data => {
        setAyahs(data.data.ayahs);
      })
      .catch(err => console.log(err.message));
  }, []);

  console.log(ayahs);
  return (
    <ScrollView>
      <View
        style={{
          margin: '3%',
          padding: '2%',
          alignItems: 'center',
        }}>
        <FlatList
          data={ayahs}
          keyExtractor={item => item.number}
          renderItem={({item}) => (
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'me_quran',
                  letterSpacing: 8,
                }}>
                {item.text}
              </Text>
              <Text style={{fontSize: 18}}>
                &#64830;{item.numberInSurah}&#64831;
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default Body;
