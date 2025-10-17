import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mt-8 mb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</Text>
        </View>

        {/* Profile Card */}
        <View className="mx-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <View className="items-center mb-6">
            {/* Avatar & Basic Info */}
            <View>
              <Image
                source={require("../../assets/images/solo.jpg")}
                className="w-24 h-24 rounded-full mb-4"
              />
            </View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">John Doe</Text>
            <Text className="text-gray-500 dark:text-gray-400 mt-1">Premium Member</Text>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between mb-6">
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">127</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Conversions</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">15</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Favorites</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">89%</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">Accuracy</Text>
            </View>
          </View>

          {/* Default Currencies */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Default Currencies</Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-2xl">🇺🇸</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">USD</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">Base</Text>
              </View>
              <View className="items-center justify-center">
                <Ionicons name="swap-horizontal" size={24} color="#6b7280" />
              </View>
              <View className="items-center">
                <Text className="text-2xl">🇪🇺</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">EUR</Text>
                <Text className="text-xs text-gray-500 dark:text-gray-400">Target</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-6 mb-6 mt-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <Ionicons name="star-outline" size={24} color="#ff00c3" />
            <Text className="ml-3 text-gray-900 dark:text-white flex-1">Favorite Currencies</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-700">
            <Ionicons name="time-outline" size={24} color="#ff00c3" />
            <Text className="ml-3 text-gray-900 dark:text-white flex-1">Conversion History</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons name="notifications-outline" size={24} color="#ff00c3" />
            <Text className="ml-3 text-gray-900 dark:text-white flex-1">Rate Alerts</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Membership Status */}
        <View className="mx-6 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg font-semibold">Premium Plan</Text>
              <Text className="text-purple-100 text-sm">Expires in 45 days</Text>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full">
              <Text className="text-purple-600 font-semibold">Renew</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer to push content up */}
        <View className="mb-24" />
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 mx-6 mb-6">
        <TouchableOpacity className="bg-red-500 py-3 rounded-xl items-center flex-row justify-center space-x-2">
          <Ionicons name="log-out" size={20} color="white" />
          <Text className="text-white font-semibold text-lg">Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button - Fixed at bottom */}
    </SafeAreaView>
  );
}