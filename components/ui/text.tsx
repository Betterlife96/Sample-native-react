import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextVariant =
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold';

function Text({
  className,
  asChild = false,
  variant = 'regular',
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
  variant?: TextVariant;
}) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;

  const fontFamily = React.useMemo(() => {
    switch (variant) {
      case 'extraLight':
        return 'BricolageGrotesque_200ExtraLight';
      case 'light':
        return 'BricolageGrotesque_300Light';
      case 'regular':
        return 'BricolageGrotesque_400Regular';
      case 'medium':
        return 'BricolageGrotesque_500Medium';
      case 'semiBold':
        return 'BricolageGrotesque_600SemiBold';
      case 'bold':
        return 'BricolageGrotesque_700Bold';
      case 'extraBold':
        return 'BricolageGrotesque_800ExtraBold';
      default:
        return 'BricolageGrotesque_400Regular';
    }
  }, [variant]);

  return (
    <Component
      className={cn('text-foreground text-base web:select-text', textClass, className)}
      style={[{ fontFamily }, props.style]}
      {...props}
    />
  );
}

export { Text, TextClassContext };
