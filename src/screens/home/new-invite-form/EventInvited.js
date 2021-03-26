import * as React from 'react';
import { View, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import MyEventsInvited from 'ping/src/screens/home/new-invite-form/MyEventsInvited';
import MyEventsGoing from 'ping/src/screens/home/new-invite-form/MyEventsGoing';
import MyEventsDeclined from 'ping/src/screens/home/new-invite-form/MyEventsDeclined';


const initialLayout = { width: Dimensions.get('window').width };
 
 function EventInvited({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'MyEventsInvited', title: 'Invited()' },
    { key: 'MyEventsGoing', title: 'Going()' },
    { key: 'MyEventsDeclined', title: 'Declined()' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
    case 'MyEventsInvited':
      return < MyEventsInvited/>;
    case 'MyEventsGoing':
        return <MyEventsGoing />;
    case 'MyEventsDeclined':
        return <MyEventsDeclined />;
    default:
      return null;
    }
  }
  const renderTabBar = props => (
    <TabBar
    {...props}
      indicatorStyle={{ backgroundColor: '#D8BB4A' }}
      style={{ backgroundColor: '#3D8976' }}
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

export default EventInvited;