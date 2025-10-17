import { useState } from 'react';
import {  Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, today, week, month

  // Mock history data
  const conversionHistory = [
    {
      id: '1',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '100',
      toAmount: '85.50',
      rate: '0.855',
      date: '2024-01-15 14:30',
      timestamp: new Date('2024-01-15T14:30:00'),
    },
    {
      id: '2',
      fromCurrency: 'GBP',
      toCurrency: 'GHS',
      fromAmount: '50',
      toAmount: '790.25',
      rate: '15.805',
      date: '2024-01-15 12:15',
      timestamp: new Date('2024-01-15T12:15:00'),
    },
    {
      id: '3',
      fromCurrency: 'EUR',
      toCurrency: 'JPY',
      fromAmount: '200',
      toAmount: '26,100',
      rate: '130.5',
      date: '2024-01-14 16:45',
      timestamp: new Date('2024-01-14T16:45:00'),
    },
    {
      id: '4',
      fromCurrency: 'USD',
      toCurrency: 'CAD',
      fromAmount: '75',
      toAmount: '94.50',
      rate: '1.26',
      date: '2024-01-14 10:20',
      timestamp: new Date('2024-01-14T10:20:00'),
    },
    {
      id: '5',
      fromCurrency: 'GHS',
      toCurrency: 'USD',
      fromAmount: '500',
      toAmount: '43.50',
      rate: '0.087',
      date: '2024-01-13 09:10',
      timestamp: new Date('2024-01-13T09:10:00'),
    },
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
  ];

  const filteredHistory = conversionHistory.filter(item => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      item.fromCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toCurrency.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Time filter
    const now = new Date();
    const itemDate = item.timestamp;
    
    switch (filter) {
      case 'today':
        return matchesSearch && itemDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return matchesSearch && itemDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return matchesSearch && itemDate >= monthAgo;
      default:
        return matchesSearch;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const clearHistory = () => {
    // Implement clear history functionality
    console.log('Clear history');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Conversion History
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 mt-1">
                {filteredHistory.length} conversions found
              </Text>
            </View>
            <TouchableOpacity 
              onPress={clearHistory}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full"
            >
              <Ionicons name="trash-outline" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 flex-row items-center">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-gray-900 dark:text-white"
              placeholder="Search currencies..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row space-x-2">
              {filters.map((filterItem) => (
                <TouchableOpacity
                  key={filterItem.value}
                  onPress={() => setFilter(filterItem.value)}
                  className={`px-4 py-2 rounded-full ${
                    filter === filterItem.value
                      ? 'bg-purple-500'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      filter === filterItem.value
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {filterItem.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* History List */}
        <View className="px-6 mb-6">
          {filteredHistory.length === 0 ? (
            <View className="items-center justify-center py-12">
              <Ionicons name="time-outline" size={64} color="#9CA3AF" />
              <Text className="text-gray-500 dark:text-gray-400 text-lg font-medium mt-4">
                No conversion history found
              </Text>
              <Text className="text-gray-400 dark:text-gray-500 text-center mt-2">
                {searchQuery ? 'Try a different search term' : 'Your conversions will appear here'}
              </Text>
            </View>
          ) : (
            <View className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
              {filteredHistory.map((item, index) => (
                <View
                  key={item.id}
                  className={`bg-white dark:bg-gray-700 rounded-xl p-4 mb-3 ${
                    index === 0 ? 'border-l-4 border-purple-500' : ''
                  }`}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-purple-500 rounded-full items-center justify-center mr-3">
                        <Ionicons name="swap-horizontal" size={20} color="white" />
                      </View>
                      <View>
                        <Text className="text-gray-900 dark:text-white font-semibold text-lg">
                          {item.fromCurrency} → {item.toCurrency}
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-sm">
                          {formatDate(item.date)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="ellipsis-vertical" size={20} color="#6b7280" />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-gray-900 dark:text-white font-semibold text-xl">
                        {item.fromAmount} {item.fromCurrency}
                      </Text>
                      <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        Rate: 1 {item.fromCurrency} = {item.rate} {item.toCurrency}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-gray-900 dark:text-white font-semibold text-xl">
                        {item.toAmount} {item.toCurrency}
                      </Text>
                      <Text className="text-green-500 text-sm">
                        Completed
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <TouchableOpacity className="flex-row items-center">
                      <Ionicons name="repeat" size={16} color="#6b7280" />
                      <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                        Convert Again
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center">
                      <Ionicons name="star-outline" size={16} color="#6b7280" />
                      <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center">
                      <Ionicons name="share-outline" size={16} color="#6b7280" />
                      <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Statistics */}
        {filteredHistory.length > 0 && (
          <View className="mx-6 mb-8">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Statistics
            </Text>
            
            <View className="flex-row justify-between">
              <View className="bg-blue-500 flex-1 mr-2 rounded-2xl p-4">
                <Text className="text-white text-sm font-medium">Total Conversions</Text>
                <Text className="text-white text-2xl font-bold mt-1">{filteredHistory.length}</Text>
              </View>
              
              <View className="bg-green-500 flex-1 ml-2 rounded-2xl p-4">
                <Text className="text-white text-sm font-medium">Most Used</Text>
                <Text className="text-white text-2xl font-bold mt-1">USD</Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View className="mx-6 mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 flex-1 mr-2 rounded-2xl p-4 items-center">
              <Ionicons name="download-outline" size={24} color="#6b7280" />
              <Text className="text-gray-700 dark:text-gray-300 font-medium mt-2">Export</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 flex-1 ml-2 rounded-2xl p-4 items-center">
              <Ionicons name="print-outline" size={24} color="#6b7280" />
              <Text className="text-gray-700 dark:text-gray-300 font-medium mt-2">Print</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}