import Reactron from 'reactotron-react-native';

if(__DEV__){

  const tron=Reactron.configure().useReactNative().connect({host:'192.168.0.103'});
  console.tron=tron;
  tron.clear();
}
