/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {BleManager} from 'react-native-ble-plx';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const manager = new BleManager();

  const [device, setDevice] = useState('');

  let Item = () => {
    <View></View>;
  };

  let scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error);
        return;
      }
      //

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      // if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
      //   // Stop scanning as it's not necessary if you are scanning for one device.
      //   manager.stopDeviceScan();

      //   // Proceed with connection.
      //   console.log('Connection Data');
      // }
      if (device.name !== null) {
        console.log('connected', device.name);

        manager.stopDeviceScan();
        device
          .connect()
          .then(device => {
            // console.log(
            //   'Device Data',
            //   device.discoverAllServicesAndCharacteristics(),
            // );
            setDevice(device.name);
            return device.discoverAllServicesAndCharacteristics();
          })
          .catch(error => {
            console.log('hello', error);
          });
      }
    });
  };

  let handleClick = () => {
    console.log('Btn Pressed');
    scanAndConnect();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '10%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: '3%',
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: '5%',
          }}
          onPress={handleClick}>
          <Text style={{color: 'white'}}>Connect</Text>
        </TouchableOpacity>

        <Text>Connected Device: {device} </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
