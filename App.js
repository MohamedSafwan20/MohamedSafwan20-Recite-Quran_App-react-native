import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './screens/Home';

function App(props) {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}

export default App;
