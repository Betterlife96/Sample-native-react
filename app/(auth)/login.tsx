import React, { useState } from 'react';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import AppSafeAreaView from '~/components/custom/app-safe-area';
import BackButton from '~/components/custom/back-button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import { loginSchema, type LoginFormData } from '~/lib/schemas/auth.schema';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setAuthError('');

    const success = await login(data.username, data.password);
    setLoading(false);

    if (success) {
      router.replace('/(guarded)');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  return (
    <AppSafeAreaView className="px-4 py-4">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="flex-1">
          <BackButton />
          <Text variant="bold" className="mt-4 text-3xl">
            Welcome back!
          </Text>
          <Text className="mt-2 max-w-[300px] text-sm text-gray-500">
            Sign in to your FarmStarter account to continue shopping
          </Text>

          <View className="gap-4">
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="mt-6 rounded-full px-4 font-medium"
                  placeholder="Enter username"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.username && (
              <Text className="mt-1 text-sm text-red-500">{errors.username.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="rounded-full px-4 font-medium"
                  placeholder="Enter password"
                  value={value}
                  isPassword
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.password && (
            <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>
          )}

          {authError ? <Text className="mt-2 text-sm text-red-500">{authError}</Text> : null}

          <TouchableOpacity className="mt-2 self-start">
            <Text variant="bold" className="text-sm text-farm-600">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View className="mt-auto">
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || loading}
            className={`rounded-full ${
              isValid && !loading ? 'bg-farm-600' : 'border border-gray-200 bg-gray-50'
            }`}>
            <Text variant="medium" className={isValid && !loading ? 'text-white' : 'text-gray-400'}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
          </Button>
          <Text className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Text
              variant="bold"
              className="text-farm-600"
              onPress={() => router.replace('/signup')}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default LoginScreen;
