import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Define types for the exchange rates
 export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CAD' | 'GHS';
type ExchangeRates = {
  [key in CurrencyCode]: {
    [key in CurrencyCode]?: number;
  };
};

export default function CurrencyConverterScreen() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('EUR');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('USD');
  const [convertedAmount, setConvertedAmount] = useState('1.172');

  // Properly typed exchange rates
  const exchangeRates: ExchangeRates = {
    EUR: { USD: 1.172, GBP: 0.85, JPY: 130.5, CAD: 1.48 },
    USD: { EUR: 0.85, GBP: 0.73, JPY: 111.5, CAD: 1.26 },
    GBP: { EUR: 1.18, USD: 1.37, JPY: 153.2, CAD: 1.74 },
    JPY: { EUR: 0.0077, USD: 0.0090, GBP: 0.0065, CAD: 0.011 },
    CAD: { EUR: 0.68, USD: 0.79, GBP: 0.57, JPY: 88.9 },
    GHS: { EUR: 0.074, USD: 0.087, GBP: 0.063, JPY: 9.62, CAD: 0.11 },
  };

  const handleConvert = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (rate) {
      const result = (parseFloat(amount) * rate).toFixed(3);
      setConvertedAmount(result);
    } else {
      // Fallback if rate not found
      setConvertedAmount('N/A');
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    handleConvert();
  };

  const popularCurrencies: { code: CurrencyCode; name: string; symbol: string; flag: string }[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
     { code: 'GHS', name: 'Ghana Cedi', symbol: '₵', flag: '🇬🇭' },
  ];

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-black'>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Header */}
          <View className='flex-row justify-between items-center px-6 py-4'>
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
              <Ionicons name="menu" size={24} color="black" className='dark:text-white' />
            </TouchableOpacity>
            <Text className='font-bold text-2xl text-black dark:text-white'>Converter</Text>
            <TouchableOpacity onPress={() => console.log('History pressed')}>
              <Ionicons name="time-outline" size={24} color="black" className='dark:text-white' />
            </TouchableOpacity>
          </View>

          {/* Current Rate Display */}
          <View className='mx-6 p-4 rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800'>
            <Text className='text-black dark:text-white text-lg font-semibold text-center'>
              1 {fromCurrency} equals {convertedAmount} {toCurrency}
            </Text>
            <Text className='text-gray-500 dark:text-gray-400 text-center mt-1'>
              Last updated: Just now
            </Text>
          </View>

          {/* Converter Card */}
          <View className='mx-6 bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 mb-6'>
            {/* Amount Input */}
            <View className='mb-6'>
              <Text className='text-gray-700 dark:text-gray-300 text-lg font-medium mb-2'>Amount</Text>
              <View className='flex-row items-center bg-white dark:bg-gray-700 rounded-xl px-4 py-3'>
                <Text className='text-gray-500 dark:text-gray-400 text-lg mr-2'>{fromCurrency}</Text>
                <TextInput
                  className='flex-1 text-black dark:text-white text-xl font-semibold'
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType='numeric'
                  placeholder='0.00'
                  placeholderTextColor='#9CA3AF'
                  onBlur={handleConvert}
                />
              </View>
            </View>

            {/* Currency Selector */}
            <View className='flex-row items-center justify-between mb-6'>
              {/* From Currency */}
              <View className='flex-1'>
                <Text className='text-gray-700 dark:text-gray-300 text-lg font-medium mb-2'>From</Text>
                <View className='bg-white dark:bg-gray-700 rounded-xl px-4 py-3'>
                  <Text className='text-black dark:text-white text-lg font-semibold text-center'>
                    {fromCurrency}
                  </Text>
                </View>
              </View>

              {/* Swap Button */}
              <TouchableOpacity 
                onPress={swapCurrencies}
                className='mx-4 mt-6 bg-purple-500 w-12 h-12 rounded-full items-center justify-center'
              >
                <Ionicons name="swap-vertical" size={24} color="white" />
              </TouchableOpacity>

              {/* To Currency */}
              <View className='flex-1'>
                <Text className='text-gray-700 dark:text-gray-300 text-lg font-medium mb-2'>To</Text>
                <View className='bg-white dark:bg-gray-700 rounded-xl px-4 py-3'>
                  <Text className='text-black dark:text-white text-lg font-semibold text-center'>
                    {toCurrency}
                  </Text>
                </View>
              </View>
            </View>

            {/* Convert Button */}
            <TouchableOpacity 
              onPress={handleConvert}
              className='bg-purple-600 py-4 rounded-xl items-center'
            >
              <Text className='text-white text-lg font-semibold'>Convert</Text>
            </TouchableOpacity>

            {/* Result Display */}
            <View className='mt-6 p-4 bg-white dark:bg-gray-700 rounded-xl'>
              <Text className='text-gray-500 dark:text-gray-400 text-center mb-2'>Converted Amount</Text>
              <Text className='text-black dark:text-white text-3xl font-bold text-center'>
                {convertedAmount} {toCurrency}
              </Text>
            </View>
          </View>

          {/* Popular Currencies */}
          <View className='mx-6'>
            <Text className='text-black dark:text-white text-xl font-bold mb-4'>Popular Currencies</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex-row space-x-6'>
                {popularCurrencies.map((currency) => (
                  <TouchableOpacity 
                    key={currency.code}
                    onPress={() => {
                      setToCurrency(currency.code);
                      handleConvert();
                    }}
                    className={`bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl min-w-20 items-center ${
                      toCurrency === currency.code ? 'border-2 border-purple-500' : ''
                    }`}
                  >
                    <Text className='text-2xl mb-1'>{currency.flag}</Text>
                    <Text className='text-black dark:text-white font-medium'>{currency.code}</Text>
                    <Text className='text-gray-500 dark:text-gray-400 text-xs'>{currency.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Quick Amounts */}
          <View className='mx-6 mt-6'>
            <Text className='text-black dark:text-white text-lg font-bold mb-3'>Quick Amounts</Text>
            <View className='flex-row flex-wrap justify-between'>
              {[10, 50, 100, 500, 1000].map((quickAmount) => (
                <TouchableOpacity
                  key={quickAmount}
                  onPress={() => {
                    setAmount(quickAmount.toString());
                    handleConvert();
                  }}
                  className='bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg mb-2'
                >
                  <Text className='text-black dark:text-white font-medium'>{quickAmount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}