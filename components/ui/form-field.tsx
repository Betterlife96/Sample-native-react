import React from 'react';
import { View } from 'react-native';
import { Text } from './text';
import { Input } from './input';

interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  autoCapitalize = 'none',
}) => (
  <View className="mb-4">
    <Text className="mb-1 font-medium text-base flex-row items-center">
      {icon && <View className="mr-2 inline-flex">{icon}</View>}
      {label}
    </Text>
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      className={`bg-white border border-gray-300 rounded-lg px-4 py-3 text-base ${error ? 'border-red-500' : ''}`}
    />
    {error ? <Text className="text-red-500 mt-1 text-sm">{error}</Text> : null}
  </View>
); 