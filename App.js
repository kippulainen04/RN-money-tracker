import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500
      }}
    >
      <BottomTabs.Screen 
      name='RecentExpenses' 
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => (
         <Ionicons color={color} size={size} name='hourglass' />
        ),
      }}
      />
      <BottomTabs.Screen 
      name='AllExpenses' 
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color, size}) => (
         <Ionicons color={color} size={size} name='calendar' />
        ),
      }}
      />
    </BottomTabs.Navigator>
  )
}
export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen 
          name='ExpensesOvaerview' 
          component={ExpensesOverview}
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen name='ManageExpense' component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>  
  );
}


