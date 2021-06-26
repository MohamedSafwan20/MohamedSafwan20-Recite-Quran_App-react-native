import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';

function Body(props) {
  const dispatch = useDispatch();
  const searchedSurah = useSelector(state => state.searchedSurahReducer);
  const [surah, setSurah] = useState(null);
  const darkMode = useSelector(state => state.darkModeReducer);
  const networkError = useSelector(state => state.networkErrorReducer);

  useEffect(() => {
    fetch('http://api.alquran.cloud/v1/surah/1')
      .then(res => res.json())
      .then(data => {
        setSurah(data.data);
      })
      .catch(err => {
        dispatch({type: 'CHANGE_NETWORK_ERROR', payload: true});
        console.log(err.message);
      });
    SplashScreen.hide();
  }, []);

  return (
    <ScrollView
      style={{height: '100%', backgroundColor: darkMode ? 'black' : null}}>
      {/* Error displaying view */}
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

      {/* Body */}
      {surah === null && searchedSurah === null ? (
        <ActivityIndicator size={40} color="#3bd627" />
      ) : (
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
                <Text
                  style={{fontSize: 18, color: darkMode ? 'white' : 'black'}}>
                  &#64830;{item.numberInSurah}&#64831;
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default Body;
