/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavigator from './DrawerNavigator';
import Profile from '../../screens/profile';
import Cart from '../../screens/transactions/cart';
import Home from '../../screens/Content/home';
import Chat from '../../screens/Content/chat';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={35} />
          ),
          tabBarActiveTintColor: '#6A4029',
          tabBarIconStyle: {marginTop: 10},
          tabBarItemStyle: {paddingLeft: 25},
          tabBarStyle: {height: 55},
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="chat-processing" color={color} size={35} />
          ),
          tabBarActiveTintColor: 'brown',
          tabBarIconStyle: {marginTop: 10},
          // tabBarHideOnKeyboard: true,
          tabBarItemStyle: {paddingRight: 0, paddingLeft: 80},
          tabBarStyle: {height: 55},
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={35} />
          ),
          tabBarActiveTintColor: '#6A4029',
          tabBarIconStyle: {marginTop: 10, marginLeft: 0, paddingRight: 10},
          tabBarStyle: {height: 55},
        }}
      />
    </Tab.Navigator>
  );
}
