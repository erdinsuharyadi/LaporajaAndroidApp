import React, { Component } from 'react'
import {StyleSheet, View, StatusBar} from 'react-native';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import MainNav from "./Src/Routes/MainNav";
import persist from "./Src/Redux/Store/store";

const persistStore = persist();

class App extends Component {
  render (){
    return(
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <MainNav />
        </PersistGate>
      </Provider>
    )
  }
}

export default App