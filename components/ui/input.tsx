import * as React from 'react';
import { TextInput, type TextInputProps, TouchableOpacity, View } from 'react-native';
import { cn } from '~/lib/utils';
import { Ionicons } from '@expo/vector-icons';

function Input({
  className,
  placeholderClassName,
  isPassword = false,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
  isPassword?: boolean;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isPassword) {
    return (
      <View className="relative">
        <TextInput
          className={cn(
            'native:h-12 bg-background native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background web:focus-visible:ring-ring h-10 border border-gray-200 px-3 pr-12 text-base file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2 lg:text-sm rounded-full',
            props.editable === false && 'opacity-50 web:cursor-not-allowed',
            className
          )}
          style={{
            fontFamily: 'BricolageGrotesque_500Medium',
          }}
          placeholderClassName={cn('text-black', placeholderClassName)}
          secureTextEntry={!showPassword}
          {...props}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ transform: [{ translateY: -12 }] }}>
          <Ionicons name={showPassword ? 'eye-off-sharp' : 'eye-sharp'} size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TextInput
      className={cn(
        'native:h-12 bg-background native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background web:focus-visible:ring-ring h-10 rounded-md border border-gray-200 px-3 text-base file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2 lg:text-sm',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className
      )}
      style={{
        fontFamily: 'BricolageGrotesque_500Medium',
      }}
      placeholderClassName={cn('text-black', placeholderClassName)}
      {...props}
    />
  );
}

export { Input };
