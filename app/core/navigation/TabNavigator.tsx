import FavouritesScreen from "@/app/features/events/screens/FavouritesScreen";
import HomeScreen from "@/app/features/events/screens/HomeScreen";
import ProfileScreen from "@/app/features/profile/screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
type IconName = keyof typeof Ionicons.glyphMap;

const Tab = createBottomTabNavigator();

const tabs: { name: string; icon: IconName; component: any }[] = [
  { name: "Home", icon: "home", component: HomeScreen },
  { name: "Favourites", icon: "heart", component: FavouritesScreen },
  { name: "Profile", icon: "person", component: ProfileScreen },
];

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 60,
          borderTopWidth: 0,
        //  position: "absolute",
          paddingBottom: 0,
        },
      }}
    >
      {tabs.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
