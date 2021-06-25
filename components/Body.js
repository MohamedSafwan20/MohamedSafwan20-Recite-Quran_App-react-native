import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, FlatList, ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';

function Body(props) {
  const searchedSurah = useSelector(state => state.searchedSurahReducer);
  const [surah, setSurah] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkMode = useSelector(state => state.darkModeReducer);
  let [networkError, setNetworkError] = useState(false);

  const fetchData = () => {
    fetch('http://api.alquran.cloud/v1/surah/2')
      .then(res => res.json())
      .then(data => {
        setNetworkError(false);
        setSurah(data.data);
        if (!isRefreshing) setIsRefreshing(false);
      })
      .catch(err => {
        setNetworkError(true);
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
    SplashScreen.hide();
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: darkMode ? 'black' : null}}
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
          alignItems: 'center',
          backgroundColor: '#e31a0b',
          height: 30,
          display: networkError ? 'flex' : 'none',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            padding: 5,
            fontWeight: 'bold',
          }}>
          Server Timed out! Please check your Network.
        </Text>
      </View>
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
            color: darkMode ? 'white' : 'black',
          }}>
          {searchedSurah !== null ? searchedSurah.name : surah?.name}
        </Text>
        <FlatList
          data={searchedSurah !== null ? searchedSurah.ayahs : surah?.ayahs}
          keyExtractor={item => item.number}
          renderItem={({item}) => (
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'me_quran',
                  letterSpacing: 8,
                  color: darkMode ? 'white' : 'black',
                }}>
                {item.text}
              </Text>
              <Text style={{fontSize: 18, color: darkMode ? 'white' : 'black'}}>
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
