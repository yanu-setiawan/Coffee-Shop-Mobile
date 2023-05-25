/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Started from './src/screens/Started';
import Welcome from './src/screens/Welcome';
import Register from './src/screens/Auth/register';
import Login from './src/screens/Auth/login';
import Forgot from './src/screens/Auth/forgot';
import Detail from './src/screens/Content/productDetail';
import Cart from './src/screens/transactions/cart';
import Delivery from './src/screens/transactions/delivery';
import Payment from './src/screens/transactions/payment';
import ProductAll from './src/screens/productAll';
import BottomTabNavigator from './src/components/Navigation/BottomTabNavigator';
import SplashScreen from './src/screens/SplashScreen';
import Chat from './src/screens/Content/chat';
import EditProfile from './src/screens/profile/editProfile';
import History from './src/screens/transactions/history';
import EditPassword from './src/screens/editPassword';
import AddProduct from './src/screens/Admin/addProduct';
import EditProduct from './src/screens/Admin/editProduct';
import ChatDetail from './src/screens/Content/chatDetail';
import SalesChart from './src/screens/Admin/dashboardAdmin';
import ManageOrder from './src/screens/Admin/manageOrder';
import CreatePromo from './src/screens/promo/createPromo';

const StackNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Splash" component={SplashScreen} />
      <Screen name="Started" component={Started} />
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Register" component={Register} />
      <Screen name="Login" component={Login} />
      <Screen name="Forgot" component={Forgot} />
      <Screen name="Detail" component={Detail} />
      <Screen name="ProductAll" component={ProductAll} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Delivery" component={Delivery} />
      <Screen name="Payment" component={Payment} />
      <Screen name="Chat" component={Chat} />
      <Screen name="ChatDetail" component={ChatDetail} />
      <Screen name="EditProfile" component={EditProfile} />
      <Screen name="History" component={History} />
      <Screen name="EditPassword" component={EditPassword} />
      <Screen name="AddProduct" component={AddProduct} />
      <Screen name="EditProduct" component={EditProduct} />
      <Screen name="Dashboard" component={SalesChart} />
      <Screen name="ManageOrder" component={ManageOrder} />
      {/* <Screen name="Promo" component={CreatePromo} /> */}

      <Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Router;
