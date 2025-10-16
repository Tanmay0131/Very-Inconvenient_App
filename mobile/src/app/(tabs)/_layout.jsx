import { Tabs } from 'expo-router';
import { Calculator, Cloud, Clock, Calendar, Video, Search, Wallet, Volume2, Sun, Map, MessageSquare, ShoppingBag, Beer } from 'lucide-react-native';
import { useTheme } from '../../utils/useTheme';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.cardBackground,
          borderTopWidth: 1,
          borderColor: theme.cardBorder,
          paddingTop: 4,
        },
        tabBarActiveTintColor: theme.primaryButton,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Calculator color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color, size }) => (
            <Cloud color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="alarm"
        options={{
          title: 'Alarm',
          tabBarIcon: ({ color, size }) => (
            <Clock color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="zoom"
        options={{
          title: 'Zoom',
          tabBarIcon: ({ color, size }) => (
            <Video color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="safari"
        options={{
          title: 'Safari',
          tabBarIcon: ({ color, size }) => (
            <Search color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Wallet color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="volume"
        options={{
          title: 'Volume',
          tabBarIcon: ({ color, size }) => (
            <Volume2 color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="brightness"
        options={{
          title: 'Brightness',
          tabBarIcon: ({ color, size }) => (
            <Sun color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color, size }) => (
            <Map color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="appstore"
        options={{
          title: 'App Store',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="beer"
        options={{
          title: 'Beer Counter',
          tabBarIcon: ({ color, size }) => (
            <Beer color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}