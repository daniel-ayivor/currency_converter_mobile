// components/haptic-tab.tsx
import { TouchableOpacity, GestureResponderEvent } from 'react-native';

interface HapticTabProps {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  accessibilityState?: { selected: boolean };
}

export function HapticTab({ children, onPress, accessibilityState }: HapticTabProps) {
  const focused = accessibilityState?.selected;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 10,
        bottom: 10,
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

export default HapticTab;