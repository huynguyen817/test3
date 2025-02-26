/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { db, ref, onChildAdded } from './src/firebaseConfig';

const App = () => {
  useEffect(() => {
    const notificationsRef = ref(db, 'events');

    const unsubscribe = onChildAdded(notificationsRef, (snapshot) => {
      const newEvent = snapshot.val();
      if (newEvent) {
        Toast.show({
          type: 'success',
          text1: 'Có 1 sản phẩm đã được thêm vào',
          text2: newEvent.title || 'Sản phẩm mới',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Toast />
    </View>
  );
};

export default App;
