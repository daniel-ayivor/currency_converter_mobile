import { useState, useMemo } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'GHS';
type ChartType = 'line' | 'bar' | 'pie';
type TimeRange = '24h' | '7d' | '1m' | '3m' | '1y';

interface Currency {
  code: CurrencyCode;
  name: string;
  color: string;
}

interface TimeRangeOption {
  label: string;
  value: TimeRange;
}

type ExchangeRatesData = Record<CurrencyCode, number[]>;

interface PieChartDataItem {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export default function ChartScreen() {
  const [selectedChart, setSelectedChart] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');

  // ✅ Ensure all arrays have equal lengths (avoids render mismatches)
  const exchangeRatesData: ExchangeRatesData = {
    USD: [1.0, 1.02, 1.01, 0.99, 1.03, 1.05, 1.04],
    EUR: [0.85, 0.86, 0.84, 0.83, 0.85, 0.87, 0.86],
    GBP: [0.73, 0.74, 0.72, 0.71, 0.73, 0.75, 0.74],
    GHS: [11.5, 11.6, 11.4, 11.3, 11.7, 11.9, 11.8],
  };

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', color: '#3B82F6' },
    { code: 'EUR', name: 'Euro', color: '#10B981' },
    { code: 'GBP', name: 'British Pound', color: '#EF4444' },
    { code: 'GHS', name: 'Ghana Cedi', color: '#8B5CF6' },
  ];

  const timeRanges: TimeRangeOption[] = [
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '1M', value: '1m' },
    { label: '3M', value: '3m' },
    { label: '1Y', value: '1y' },
  ];

  // ✅ Memoize chart data to avoid chart kit crashes on tab change
  const chartData = useMemo(() => exchangeRatesData[selectedCurrency] || [0, 0, 0, 0, 0, 0, 0], [selectedCurrency]);

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#3B82F6',
    },
  };

  const lineChartData = useMemo(() => ({
    labels: ['1D', '2D', '3D', '4D', '5D', '6D', '7D'],
    datasets: [{ data: chartData }],
  }), [chartData]);

  const barChartData = useMemo(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: chartData.map(val => val * 10) }],
  }), [chartData]);

  const pieChartData: PieChartDataItem[] = [
    { name: 'USD', population: 35, color: '#3B82F6', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'EUR', population: 25, color: '#10B981', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'GBP', population: 20, color: '#EF4444', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'GHS', population: 20, color: '#8B5CF6', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const renderChart = useMemo(() => {
    switch (selectedChart) {
      case 'line':
        return (
          <LineChart
            data={lineChartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        );
      case 'bar':
        return (
          <BarChart
            data={barChartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
            showBarTops={true}
            withInnerLines={true}
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        );
      case 'pie':
        return (
          <PieChart
            data={pieChartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        );
      default:
        return null;
    }
  }, [selectedChart, lineChartData, barChartData]);

  // Helpers
  const getCurrentRate = (currency: CurrencyCode) => exchangeRatesData[currency]?.slice(-1)[0] || 0;
  const getMaxRate = (currency: CurrencyCode) => Math.max(...(exchangeRatesData[currency] || [0]));
  const getMinRate = (currency: CurrencyCode) => Math.min(...(exchangeRatesData[currency] || [0]));

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">Exchange Rates</Text>
              <Text className="text-gray-500 dark:text-gray-400 mt-1">Track currency performance</Text>
            </View>
            <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <Ionicons name="download-outline" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Currency Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row space-x-2">
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.code}
                  onPress={() => setSelectedCurrency(currency.code)}
                  className={`px-4 py-2 rounded-full ${selectedCurrency === currency.code ? 'bg-blue-500' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  <Text className={`font-medium ${selectedCurrency === currency.code ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {currency.code}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Time Range Selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row space-x-2">
              {timeRanges.map((range) => (
                <TouchableOpacity
                  key={range.value}
                  onPress={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-full ${timeRange === range.value ? 'bg-purple-500' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  <Text className={`font-medium ${timeRange === range.value ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Chart Type Selector */}
        <View className="flex-row justify-around mx-6 mb-6 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
          {(['line', 'bar', 'pie'] as ChartType[])?.map((chart) => (
            <TouchableOpacity
              key={chart}
              onPress={() => setSelectedChart(chart)}
              className={`flex-1 items-center py-3 rounded-xl ${selectedChart === chart ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
            >
              <Ionicons
                name={chart === 'line' ? 'trending-up' : chart === 'bar' ? 'bar-chart' : 'pie-chart'}
                size={24}
                color={selectedChart === chart ? '#3B82F6' : '#6b7280'}
              />
              <Text className={`text-sm font-medium mt-1 ${selectedChart === chart ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {chart.charAt(0).toUpperCase() + chart.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View className="mx-6 bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">{selectedCurrency} Exchange Rate</Text>
            <View className="flex-row items-center">
              <Text className="text-green-500 font-semibold mr-2">+2.3%</Text>
              <Ionicons name="trending-up" size={16} color="#10B981" />
            </View>
          </View>
          {renderChart}
          <View className="flex-row justify-between mt-4">
            <Text className="text-gray-500 dark:text-gray-400 text-sm">Current: {getCurrentRate(selectedCurrency).toFixed(3)}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">High: {getMaxRate(selectedCurrency).toFixed(3)}</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm">Low: {getMinRate(selectedCurrency).toFixed(3)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
