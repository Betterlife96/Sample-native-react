import { router } from 'expo-router';
import { View } from 'react-native';
import AppSafeAreaView from '~/components/custom/app-safe-area';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

const WelcomeScreen = () => {
  return (
    <AppSafeAreaView>
      <View className="mt-24 flex-1 items-center">
        <Text className="mb-2 mt-6 text-2xl text-farm-600" variant="semiBold">
          FarmStarter
        </Text>

        <Text className="mt-4 max-w-[320px] text-center text-lg leading-6 text-gray-700">
          Your online marketplace for fresh farm products. Shop, browse, and order directly from
          local farmers.
        </Text>

        <Text className="mt-6 max-w-[300px] text-center text-sm text-gray-500">
          Discover quality products, add to cart, and enjoy seamless shopping experience with secure
          checkout.
        </Text>

        <View className="mb-4 mt-auto w-full gap-3 px-4">
          <Button
            onPress={() => {
              router.navigate('/login');
            }}
            className="rounded-full bg-farm-600">
            <Text variant="medium" className="text-white">
              Login
            </Text>
          </Button>
          <Button
            onPress={() => {
              router.navigate('/signup');
            }}
            className="rounded-full border border-farm-600 bg-white">
            <Text variant="medium" className="text-farm-600">
              Sign Up
            </Text>
          </Button>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default WelcomeScreen;
