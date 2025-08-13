import React from 'react';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

const AppSafeAreaView = ({
  children,
  className = '',
  edges,
}: {
  children: React.ReactNode;
  className?: string;
  edges?: Edges | undefined;
}) => {
  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-white ${className}`}>
      {children}
    </SafeAreaView>
  );
};

export default AppSafeAreaView;
