import "../../global.css";
import {  Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Mock data for recent conversions
  const recentConversions = [
    { from: 'USD', to: 'EUR', amount: '100', result: '85.50', date: '2 min ago' },
    { from: 'GBP', to: 'GHS', amount: '50', result: '790.25', date: '1 hour ago' },
    { from: 'EUR', to: 'JPY', amount: '200', result: '26,100', date: '3 hours ago' },
  ];

  // Favorite currencies
  const favoriteCurrencies = [
    { code: 'USD', name: 'US Dollar', rate: '1.00', change: '+0.2%', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', rate: '0.85', change: '-0.1%', flag: '🇪🇺' },
    { code: 'GHS', name: 'Ghana Cedi', rate: '11.5', change: '+0.5%', flag: '🇬🇭' },
    { code: 'GBP', name: 'British Pound', rate: '0.73', change: '+0.3%', flag: '🇬🇧' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-2">
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back!
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 mt-1">
                Ready to convert some currencies?
              </Text>
            </View>
            <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <Ionicons name="notifications-outline" size={24} color={isDark ? "#fff" : "#000"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6">
            <View>
              <Text className="text-white text-lg font-semibold">Total Conversions</Text>
              <Text className="text-white text-3xl font-bold mt-1">127</Text>
              <Text className="text-purple-100 text-sm mt-1">This month</Text>
            </View>
            <View className="items-center justify-center">
              <Ionicons name="trending-up" size={40} color="white" />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-blue-500 w-20 h-20 rounded-2xl items-center justify-center">
              <Ionicons name="swap-horizontal" size={32} color="white" />
              <Text className="text-white text-xs font-medium mt-1">Convert</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-green-500 w-20 h-20 rounded-2xl items-center justify-center">
              <Ionicons name="star" size={32} color="white" />
              <Text className="text-white text-xs font-medium mt-1">Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-orange-500 w-20 h-20 rounded-2xl items-center justify-center">
              <Ionicons name="time" size={32} color="white" />
              <Text className="text-white text-xs font-medium mt-1">History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-red-500 w-20 h-20 rounded-2xl items-center justify-center">
              <Ionicons name="alert-circle" size={32} color="white" />
              <Text className="text-white text-xs font-medium mt-1">Alerts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Favorite Currencies */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Favorite Currencies
            </Text>
            <TouchableOpacity>
              <Text className="text-purple-600 dark:text-purple-400 font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
            {favoriteCurrencies.map((currency, index) => (
              <TouchableOpacity 
                key={currency.code}
                className={`flex-row items-center justify-between py-3 ${
                  index !== favoriteCurrencies.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">{currency.flag}</Text>
                  <View>
                    <Text className="text-gray-900 dark:text-white font-semibold">
                      {currency.code}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm">
                      {currency.name}
                    </Text>
                  </View>
                </View>
                
                <View className="items-end">
                  <Text className="text-gray-900 dark:text-white font-semibold">
                    {currency.rate}
                  </Text>
                  <Text className={`text-sm ${
                    currency.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {currency.change}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Conversions */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Conversions
            </Text>
            <TouchableOpacity>
              <Text className="text-purple-600 dark:text-purple-400 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
            {recentConversions.map((conversion, index) => (
              <View 
                key={index}
                className={`flex-row items-center justify-between py-3 ${
                  index !== recentConversions.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center mr-3">
                    <Ionicons name="swap-horizontal" size={20} color="white" />
                  </View>
                  <View>
                    <Text className="text-gray-900 dark:text-white font-semibold">
                      {conversion.from} → {conversion.to}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm">
                      {conversion.amount} {conversion.from}
                    </Text>
                  </View>
                </View>
                
                <View className="items-end">
                  <Text className="text-gray-900 dark:text-white font-semibold">
                    {conversion.result} {conversion.to}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">
                    {conversion.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Exchange Rate Alert */}
        <View className="mx-6 mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-5">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">Rate Alert</Text>
              <Text className="text-blue-100 text-sm mt-1">
                Get notified when USD/EUR hits 0.90
              </Text>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
              <Text className="text-blue-600 font-semibold">Set Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}