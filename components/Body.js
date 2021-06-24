import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, FlatList, ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function Body(props) {
  const [surah, setSurah] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = () => {
    fetch('http://api.alquran.cloud/v1/surah/1')
      .then(res => res.json())
      .then(data => {
        setSurah(data.data);
        if (!isRefreshing) setIsRefreshing(false);
      })
      .catch(err => console.log(err.message));
  };

  useEffect(() => {
    fetchData();
    SplashScreen.hide();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            setIsRefreshing(true);
            fetchData();
          }}
          refreshing={isRefreshing}
        />
      }>
      <View
        style={{
          margin: '3%',
          padding: '2%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 34,
            fontWeight: 'bold',
            borderBottomColor: '#3bd627',
            borderBottomWidth: 3,
            marginBottom: '3%',
          }}>
          {surah?.name}
        </Text>
        <FlatList
          data={surah?.ayahs}
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
