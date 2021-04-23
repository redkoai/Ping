import * as React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Accounts from 'ping/src/screens/home/Accounts';
import Accountsone from 'ping/src/screens/home/Accountsone';


 
// const Accounts = () => (
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
// );
 
// const Accountsone = () => (
//   <View style={[styles.scene]} />
// );
 
const initialLayout = { width: Dimensions.get('window').width };
 
export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Accounts', title: 'Profile' },
    { key: 'Accountsone', title: 'Friends' },
  ]);
 
//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

  const renderScene = ({ route }) => {
    switch (route.key) {
    case 'Accounts':
      return <Accounts />;
    case 'Accountsone':
        return <Accountsone />;
    default:
      return null;
    }
  }
  const renderTabBar = props => (
    <TabBar
    {...props}
      indicatorStyle={{ backgroundColor: '#D8BB4A' }}
      style={{ backgroundColor: '#A6ACE9' }}
    />
  );
  return (
   
  <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />  
     
  );
    }

 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});