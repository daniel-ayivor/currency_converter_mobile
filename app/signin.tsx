// app/signin.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log('Login pressed');
    
    // Wrap navigation in try-catch and setTimeout
    try {
      // Wait a tick before navigating
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Check if we can navigate
      if (router) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Navigation failed:', error);
      // Try alternative navigation
      try {
        router.push('/(tabs)/home');
      } catch (e) {
        console.error('Fallback navigation also failed:', e);
      }
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-gradient-to-br from-violet-600 to-blue-600'>
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
            onPress={() => {
              try {
                router.back();
              } catch (e) {
                console.error('Back navigation failed:', e);
              }
            }}
            className='absolute top-4 left-6 w-12 h-12 bg-white/20 rounded-full justify-center items-center active:bg-white/30 z-10'
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Logo */}
          <ThemedView className='items-center mb-8 mt-16'>
            <ThemedView className='w-24 h-24 bg-white/20 rounded-full justify-center items-center border-2 border-white/30 mb-4'>
              <ThemedText className='text-6xl'>💎</ThemedText>
            </ThemedView>
            <ThemedText className='text-3xl font-bold text-white'>Welcome Back</ThemedText>
            <ThemedText className='text-white/70 mt-2'>Sign in to continue</ThemedText>
          </ThemedView>

          {/* Form Container */}
          <ThemedView className='bg-white/95 dark:bg-gray-800/95 rounded-3xl p-6 shadow-2xl'>
            <ThemedText className='text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center'>
              Sign In
            </ThemedText>

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
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  className='flex-1 ml-3 text-gray-900 dark:text-white text-base'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
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

            {/* Login Button */}
            <TouchableOpacity 
              onPress={handleLogin}
              className='bg-violet-600 rounded-xl py-4 shadow-lg active:scale-98'
              activeOpacity={0.8}
            >
              <ThemedText className='text-white text-center font-bold text-lg'>
                Sign In
              </ThemedText>
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity 
              onPress={() => {
                try {
                  router.push('/register');
                } catch (e) {
                  console.error('Register navigation failed:', e);
                }
              }}
              className='items-center mt-6'
            >
              <ThemedText className='text-gray-700 dark:text-gray-300'>
                Don't have an account?{' '}
                <ThemedText className='text-violet-600 dark:text-violet-400 font-bold'>
                  Sign Up
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}