/* eslint-disable prettier/prettier */
import React from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomDrawer';
import Home from '../../screens/Content/home';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Home">
      <Drawer.Screen
        name="HomeDrawer"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: '',
          drawerStyle: {
            borderTopRightRadius: 30,
          },
        }}
      />
    </Drawer.Navigator>
  );
}
