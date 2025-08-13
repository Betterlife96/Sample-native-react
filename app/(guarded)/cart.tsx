import React from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { Container } from '~/components/Container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCart } from '~/context/CartContext';
import { router } from 'expo-router';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const renderCartItem = ({ item }: { item: any }) => (
    <View className="mb-4 rounded-2xl border border-gray-100 bg-white py-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="mr-4 h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
          <Image source={{ uri: item.image }} className="h-full w-full" />
        </View>
        <View className="flex-1">
          <Text variant="medium" className="mb-1 text-base text-gray-900">
            {item.name}
          </Text>
          <Text className="mb-2 text-sm text-gray-600">
            ${item.price.toFixed(2)} per {item.unit}
          </Text>

          {/* Quantity Controls */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center rounded-lg bg-gray-50">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                className="rounded-l-lg p-2"
                disabled={item.quantity <= 1}>
                <Minus size={16} color={item.quantity <= 1 ? '#9ca3af' : '#374151'} />
              </TouchableOpacity>
              <View className="px-3 py-2">
                <Text variant="medium" className="text-sm text-gray-900">
                  {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                className="rounded-r-lg p-2">
                <Plus size={16} color="#374151" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center">
              <Text variant="bold" className="mr-3 text-base text-green-600">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                className="h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <Trash2 size={16} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center px-4">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Text className="text-4xl">🛒</Text>
          </View>
          <Text variant="bold" className="mb-2 text-xl text-gray-900">
            Your cart is empty
          </Text>
          <Text className="mb-6 text-center text-gray-600">
            Add some fresh products to get started
          </Text>
          <Button onPress={() => router.back()} className="rounded-full bg-green-600 px-6">
            <Text variant="medium" className="text-white">
              Browse Products
            </Text>
          </Button>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="mb-6">
        <Text variant="bold" className="text-2xl text-gray-900">
          Shopping Cart
        </Text>
        <Text className="text-sm text-gray-600">
          {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
        </Text>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row items-center justify-between">
              <Text variant="medium" className="text-lg text-gray-900">
                Subtotal
              </Text>
              <Text variant="bold" className="text-xl text-green-600">
                ${total.toFixed(2)}
              </Text>
            </View>

            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-sm text-gray-600">Delivery Fee</Text>
              <Text className="text-sm text-gray-600">Free</Text>
            </View>

            <View className="mb-6 flex-row items-center justify-between border-t border-gray-100 pt-4">
              <Text variant="bold" className="text-xl text-gray-900">
                Total
              </Text>
              <Text variant="bold" className="text-2xl text-green-600">
                ${total.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row gap-3">
              <Button
                onPress={clearCart}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-100">
                <Text variant="medium" className="text-gray-700">
                  Clear Cart
                </Text>
              </Button>
              <Button className="flex-1 rounded-xl bg-green-600">
                <Text variant="medium" className="text-white">
                  Checkout
                </Text>
              </Button>
            </View>
          </View>
        }
      />
    </Container>
  );
}
