import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Text } from '../ui/text';
import { ArrowLeft } from 'lucide-react-native';

const BackButton = ({ title }: { title?: string }) => {
  if (!router.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity hitSlop={20} className="flex-row items-center" onPress={() => router.back()}>
<ArrowLeft  />
      {title && (
        <Text variant="medium" className="-ml-4 flex-1 text-center text-base">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BackButton;
