// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme, View } from 'react-native';
import "../../global.css"

export default function RadioTabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
        headerShown: false,
        // Remove the tabBarButton line completely
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={focused ? size + 2 : size}
                color={color}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center', position: 'relative' }}>
              <FontAwesome5
                name="money-bill-wave"
                size={focused ? size + 2 : size}
                color={color}
              />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#10B981',
                    borderWidth: 1,
                    borderColor: isDark ? '#1F2937' : '#FFFFFF',
                  }}
                />
              )}
            </View>
          ),
        }}
      />
     
      <Tabs.Screen
        name="chart"
        options={{
          title: 'Chart',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={focused ? 'bar-chart' : 'bar-chart-outline'}
                size={focused ? size + 2 : size}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={focused ? 'time' : 'time-outline'}
                size={focused ? size + 2 : size}
                color={color}
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={focused ? size + 2 : size}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}