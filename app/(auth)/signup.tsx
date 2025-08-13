import React, { useState } from 'react';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import AppSafeAreaView from '~/components/custom/app-safe-area';
import BackButton from '~/components/custom/back-button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import { signupSchema, type SignupFormData } from '~/lib/schemas/auth.schema';

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const { signup } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setAuthError('');

    const success = await signup(data.username, data.password);
    setLoading(false);

    if (success) {
      router.replace('/(guarded)');
    } else {
      setAuthError('Username already taken or error occurred');
    }
  };

  return (
    <AppSafeAreaView className="px-4 py-4">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="flex-1">
          <BackButton />
          <Text variant="bold" className="mt-4 text-3xl">
            Create Account
          </Text>
          <Text className="mt-2 max-w-[300px] text-sm text-gray-500">
            Join FarmStarter and start shopping for fresh farm products
          </Text>

          <View className="gap-4">
            <View>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <Input
                    className="mt-6 rounded-full px-4 font-medium"
                    placeholder="Choose a username"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.username && (
                <Text className="mt-1 text-sm text-red-500">{errors.username.message}</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    className="rounded-full px-4 font-medium"
                    placeholder="Create a password"
                    value={value}
                    isPassword
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-sm text-red-500">{errors.password.message}</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    className="rounded-full px-4 font-medium"
                    placeholder="Confirm password"
                    value={value}
                    onChangeText={onChange}
                    isPassword
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</Text>
              )}
            </View>

            {authError ? <Text className="mt-2 text-sm text-red-500">{authError}</Text> : null}
          </View>
        </ScrollView>

        <View className="mt-auto">
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || loading}
            className={`rounded-full ${
              isValid && !loading ? 'bg-farm-600' : 'border border-gray-200 bg-gray-50'
            }`}>
            <Text variant="medium" className={isValid && !loading ? 'text-white' : 'text-gray-400'}>
              {loading ? 'Creating account...' : 'Create account'}
            </Text>
          </Button>
          <Text className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Text variant="bold" className="text-farm-600" onPress={() => router.replace('/login')}>
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default SignupScreen;
