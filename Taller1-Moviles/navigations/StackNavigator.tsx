import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Loginn" component={View} /> 
    </Stack.Navigator>
  );
}