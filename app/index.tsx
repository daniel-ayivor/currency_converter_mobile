// ============= app/index.tsx (Welcome Screen) =============
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/signin');
  };

  return (
    <SafeAreaView className='flex-1 bg-gradient-to-br from-violet-600 to-blue-600'>
      <ThemedView className='flex-1 justify-center items-center px-8'>
        {/* Animated Currency Icon Container */}
        <ThemedView className='w-40 h-40 bg-white/20 rounded-full justify-center items-center mb-12 border-4 border-white/40 shadow-2xl'>
          <ThemedText className='text-9xl'>💎</ThemedText>
        </ThemedView>

        {/* Welcome Text Container */}
        <ThemedView className='items-center mb-16'>
          <ThemedText className='text-5xl font-bold text-white text-center mb-3'>
            Pecunia
          </ThemedText>
          <ThemedText className='text-2xl font-semibold text-white/90 text-center mb-4'>
            Currency Converter
          </ThemedText>
          <ThemedText className='text-base text-white/70 text-center leading-6 max-w-xs'>
            Convert currencies instantly with real-time exchange rates
          </ThemedText>
        </ThemedView>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleStart}
          className='bg-white px-16 py-5 rounded-full shadow-xl active:scale-95'
          activeOpacity={0.8}
        >
          <ThemedText className="text-violet-600 text-xl font-bold">
            Get Started
          </ThemedText>
        </TouchableOpacity>

        {/* Bottom Decoration */}
        <ThemedView className='absolute bottom-8 items-center'>
          <ThemedText className='text-white/50 text-sm'>
            Fast • Secure • Reliable
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}