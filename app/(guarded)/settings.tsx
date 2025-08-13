import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react-native';
import { Container } from '~/components/Container';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import { useCart } from '~/context/CartContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { cart, total } = useCart();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const menuItems = [
    {
      icon: ShoppingBag,
      title: 'Order History',
      subtitle: 'View your past orders',
      onPress: () => Alert.alert('Coming Soon', 'Order history will be available soon!'),
      color: '#16a34a',
    },
    {
      icon: Heart,
      title: 'Favorites',
      subtitle: 'Your saved products',
      onPress: () => Alert.alert('Coming Soon', 'Favorites feature will be available soon!'),
      color: '#dc2626',
    },
    {
      icon: MapPin,
      title: 'Delivery Address',
      subtitle: 'Manage your addresses',
      onPress: () => Alert.alert('Coming Soon', 'Address management will be available soon!'),
      color: '#2563eb',
    },
    {
      icon: Phone,
      title: 'Contact Support',
      subtitle: 'Get help from our team',
      onPress: () => Alert.alert('Contact', 'Email us at support@farmstarter.com'),
      color: '#7c3aed',
    },
    {
      icon: Settings,
      title: 'App Settings',
      subtitle: 'Notifications, privacy, and more',
      onPress: () => Alert.alert('Coming Soon', 'App settings will be available soon!'),
      color: '#6b7280',
    },
  ];

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="mb-6">
          <Text variant="bold" className="text-2xl text-gray-900">
            Profile & Settings
          </Text>
          <Text className="text-sm text-gray-600">Manage your account and preferences</Text>
        </View>

        {/* User Profile Card */}
        <View className="mb-6 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
          <View className="flex-row items-center">
            <Avatar className="mr-4 h-16 w-16" alt={user?.username || 'User'}>
              <AvatarImage
                source={{
                  uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                }}
              />
              <AvatarFallback className="bg-green-100">
                <User size={24} color="#16a34a" />
              </AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <Text variant="bold" className="text-lg text-gray-900">
                {user?.username}
              </Text>
              <Text className="text-sm text-gray-600">FarmStarter Member</Text>
              <View className="mt-1 flex-row items-center">
                <View className="flex-row items-center rounded-full bg-green-100 px-2 py-1">
                  <View className="mr-1 h-2 w-2 rounded-full bg-green-500" />
                  <Text className="text-xs font-medium text-green-700">Active</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mb-6">
          <Text variant="medium" className="mb-3 text-sm text-gray-700">
            Quick Stats
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-xl border border-gray-100 bg-white p-4">
              <View className="mb-2 flex-row items-center justify-between">
                <ShoppingBag size={20} color="#16a34a" />
                <Text className="text-xs text-gray-500">Cart Items</Text>
              </View>
              <Text variant="bold" className="text-xl text-gray-900">
                {cart.length}
              </Text>
              <Text className="text-xs text-gray-500">${total.toFixed(2)} total</Text>
            </View>
            <View className="flex-1 rounded-xl border border-gray-100 bg-white p-4">
              <View className="mb-2 flex-row items-center justify-between">
                <Heart size={20} color="#dc2626" />
                <Text className="text-xs text-gray-500">Favorites</Text>
              </View>
              <Text variant="bold" className="text-xl text-gray-900">
                0
              </Text>
              <Text className="text-xs text-gray-500">Saved items</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mb-6">
          <Text variant="medium" className="mb-3 text-sm text-gray-700">
            Account & Settings
          </Text>
          <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.title}
                onPress={item.onPress}
                className={`flex-row items-center p-4 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                activeOpacity={0.7}>
                <View
                  className="mr-4 h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon size={20} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text variant="medium" className="text-base text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500">{item.subtitle}</Text>
                </View>
                <View className="h-2 w-2 rounded-full bg-gray-300" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View className="mb-6">
          <Text variant="medium" className="mb-3 text-sm text-gray-700">
            App Information
          </Text>
          <View className="rounded-2xl border border-gray-100 bg-white p-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-sm text-gray-600">App Version</Text>
              <Text className="text-sm font-medium text-gray-900">1.0.0</Text>
            </View>
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-sm text-gray-600">Build Number</Text>
              <Text className="text-sm font-medium text-gray-900">2024.1</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-600">Last Updated</Text>
              <Text className="text-sm font-medium text-gray-900">Today</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View className="mb-8">
          <Button onPress={handleLogout} className="rounded-xl border border-red-200 bg-red-50">
            <View className="flex-row items-center justify-center">
              <LogOut size={20} color="#dc2626" />
              <Text variant="medium" className="ml-2 text-red-600">
                Logout
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
}
