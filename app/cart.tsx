import React from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Container } from '../components/Container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Text } from '../components/ui/text';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cart, total, clearCart } = useCart();

  const handlePurchase = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Add items to your cart before purchasing.');
      return;
    }
    clearCart();
    Alert.alert('Success', 'Purchase completed!');
  };

  return (
    <Container>
      <Text className="text-2xl font-bold mb-6 text-center">Your Cart</Text>
      {cart.length === 0 ? (
        <Text className="text-center text-lg mt-10">Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card className="mb-4">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>{item.name}</CardTitle>
                <Text className="text-base font-semibold">x{item.quantity}</Text>
              </CardHeader>
              <CardContent className="flex-row justify-between">
                <Text>Price: ${item.price.toFixed(2)}</Text>
                <Text>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
              </CardContent>
            </Card>
          )}
        />
      )}
      <View className="mt-8 mb-4">
        <Text className="text-xl font-bold text-center">Total: ${total.toFixed(2)}</Text>
      </View>
      <Button onPress={handlePurchase} className="w-full">
        <Text>Purchase</Text>
      </Button>
    </Container>
  );
} 