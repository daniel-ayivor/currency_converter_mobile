
// ============= app/register.tsx (Register Screen) =============
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {  TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Register pressed');
    // Navigate to tabs after successful registration
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className='flex-1 bg-gradient-to-br from-blue-600 to-violet-600'>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className='absolute top-4 left-6 w-12 h-12 bg-white/20 rounded-full justify-center items-center active:bg-white/30 z-10'
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Logo */}
          <ThemedView className='items-center mb-8 mt-16'>
            <ThemedView className='w-24 h-24 bg-white/20 rounded-full justify-center items-center border-2 border-white/30 mb-4'>
              <ThemedText className='text-6xl'>💎</ThemedText>
            </ThemedView>
            <ThemedText className='text-3xl font-bold text-white'>Create Account</ThemedText>
            <ThemedText className='text-white/70 mt-2'>Join us today</ThemedText>
          </ThemedView>

          {/* Form Container */}
          <ThemedView className='bg-white/95 dark:bg-gray-800/95 rounded-3xl p-6 shadow-2xl'>
            <ThemedText className='text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center'>
              Sign Up
            </ThemedText>

            {/* Name Input */}
            <ThemedView className='mb-4'>
              <ThemedText className='text-gray-700 dark:text-gray-300 mb-2 font-medium'>
                Full Name
              </ThemedText>
              <ThemedView className='flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3'>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-gray-900 dark:text-white text-base'
                  value={name}
                  onChangeText={setName}
                  autoComplete="name"
                />
              </ThemedView>
            </ThemedView>

            {/* Email Input */}
            <ThemedView className='mb-4'>
              <ThemedText className='text-gray-700 dark:text-gray-300 mb-2 font-medium'>
                Email
              </ThemedText>
              <ThemedView className='flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3'>
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-gray-900 dark:text-white text-base'
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </ThemedView>
            </ThemedView>

            {/* Password Input */}
            <ThemedView className='mb-6'>
              <ThemedText className='text-gray-700 dark:text-gray-300 mb-2 font-medium'>
                Password
              </ThemedText>
              <ThemedView className='flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3'>
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-gray-900 dark:text-white text-base'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password-new"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>

            {/* Register Button */}
            <TouchableOpacity 
              onPress={handleRegister}
              className='bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl py-4 shadow-lg active:scale-98'
              activeOpacity={0.8}
            >
              <ThemedText className='text-white text-center font-bold text-lg'>
                Create Account
              </ThemedText>
            </TouchableOpacity>

            {/* Divider */}
            <ThemedView className='flex-row items-center my-6'>
              <ThemedView className='flex-1 h-px bg-gray-300 dark:bg-gray-600' />
              <ThemedText className='mx-4 text-gray-500 dark:text-gray-400'>or</ThemedText>
              <ThemedView className='flex-1 h-px bg-gray-300 dark:bg-gray-600' />
            </ThemedView>

            {/* Login Link */}
            <TouchableOpacity 
              onPress={() => router.push('/signin')}
              className='items-center'
            >
              <ThemedText className='text-gray-700 dark:text-gray-300'>
                Already have an account?{' '}
                <ThemedText className='text-violet-600 dark:text-violet-400 font-bold'>
                  Sign In
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}