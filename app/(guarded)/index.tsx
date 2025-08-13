import * as Location from 'expo-location';
import { Leaf, MapPin, Package, ShoppingCart, Search, Filter, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsData from '~/assets/data/products.json';
import { Container } from '~/components/Container';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCart } from '~/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  unit: string;
  category: string;
}

const SEARCH_STORAGE_KEY = '@farmstarter_search';
const CATEGORY_STORAGE_KEY = '@farmstarter_category';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locLoading, setLocLoading] = useState(true);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categories = ['all', ...Array.from(new Set(productsData.map((p) => p.category)))];

  useEffect(() => {
    setProducts(productsData as Product[]);
    setLoading(false);
    loadSearchState();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      setLocLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        setLocLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setLocLoading(false);
    };
    getLocation();
  }, []);

  const loadSearchState = async () => {
    try {
      const [savedSearch, savedCategory] = await Promise.all([
        AsyncStorage.getItem(SEARCH_STORAGE_KEY),
        AsyncStorage.getItem(CATEGORY_STORAGE_KEY),
      ]);
      if (savedSearch) setSearchQuery(savedSearch);
      if (savedCategory) setSelectedCategory(savedCategory);
    } catch (e) {
      console.error('Error loading search state:', e);
    }
  };

  const saveSearchState = async (query: string, category: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(SEARCH_STORAGE_KEY, query),
        AsyncStorage.setItem(CATEGORY_STORAGE_KEY, category),
      ]);
    } catch (e) {
      console.error('Error saving search state:', e);
    }
  };

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
    saveSearchState(searchQuery, selectedCategory);
  }, [products, searchQuery, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="mb-4" />
          <Text className="text-gray-500">Loading fresh farm products...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="mb-6">
        <Text variant="bold" className="text-2xl text-green-800">
          Fresh from the Farm
        </Text>
        <Text className="text-sm text-gray-600">
          Discover local, organic produce from nearby farmers
        </Text>
      </View>

      <View className="mb-4">
        <View className="flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <Search size={20} color="#6b7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
            className="ml-3 flex-1 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            style={{
              fontFamily: 'BricolageGrotesque_500Medium',
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} className="ml-2">
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className={`ml-2 rounded-lg p-1 ${showFilters ? 'bg-green-100' : 'bg-gray-100'}`}>
            <Filter size={20} color={showFilters ? '#16a34a' : '#6b7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {showFilters && (
        <View className="mb-4">
          <Text variant="medium" className="mb-2 text-sm text-gray-700">
            Categories:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 ${
                  selectedCategory === category ? 'bg-green-600' : 'bg-gray-100'
                }`}>
                <Text
                  variant="medium"
                  className={`text-sm ${
                    selectedCategory === category ? 'text-white' : 'text-gray-700'
                  }`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View className="mb-6 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <MapPin size={20} color="#16a34a" />
          </View>
          <View className="flex-1">
            <Text variant="medium" className="mb-1 text-sm text-gray-700">
              Farm Location
            </Text>
            {locLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#16a34a" />
                <Text className="ml-2 text-xs text-gray-500">Finding nearby farms...</Text>
              </View>
            ) : location ? (
              <Text className="text-xs text-gray-600">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Text>
            ) : (
              <Text className="text-xs text-gray-600">Location unavailable</Text>
            )}
          </View>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Package size={48} color="#d1d5db" className="mb-4" />
            <Text className="mb-2 text-center text-gray-500">
              {searchQuery || selectedCategory !== 'all'
                ? 'No products match your search'
                : 'No farm products found'}
            </Text>
            <Text className="text-center text-sm text-gray-400">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Check back for fresh harvest'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-1" activeOpacity={0.9}>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <View className="relative">
                <View className="h-40 w-full bg-gray-50">
                  <Avatar className="h-full w-full rounded-none" alt={item.name}>
                    <AvatarImage
                      source={{ uri: item.image }}
                      style={{ resizeMode: 'cover', width: '100%' }}
                    />
                  </Avatar>
                </View>

                <View className="absolute right-3 top-3">
                  {item.stock === 0 ? (
                    <View className="rounded-full bg-red-500 px-2 py-1">
                      <Text variant="medium" className="text-xs text-white">
                        Out of Stock
                      </Text>
                    </View>
                  ) : item.stock < 10 ? (
                    <View className="rounded-full bg-orange-500 px-2 py-1">
                      <Text variant="medium" className="text-xs text-white">
                        Low Stock
                      </Text>
                    </View>
                  ) : (
                    <View className="rounded-full bg-green-500 px-2 py-1">
                      <Text variant="medium" className="text-xs text-white">
                        Fresh
                      </Text>
                    </View>
                  )}
                </View>

                <View className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
                  <View className="flex-row items-center">
                    <Leaf size={12} color="#16a34a" />
                    <Text variant="medium" className="ml-1 text-xs text-gray-700">
                      Organic
                    </Text>
                  </View>
                </View>
              </View>

              <View className="p-4">
                <Text
                  variant="semiBold"
                  className="mb-2 line-clamp-2 text-sm text-gray-900"
                  numberOfLines={2}>
                  {item.name}
                </Text>

                <View className="mb-3 flex-row items-center justify-between">
                  <View>
                    <Text variant="bold" className="text-lg text-green-700">
                      ${item.price.toFixed(2)}
                    </Text>
                    <Text className="text-xs text-gray-500">per {item.unit}</Text>
                  </View>
                  <Text className="text-xs text-gray-500">
                    {item.stock} {item.unit} left
                  </Text>
                </View>

                <Button
                  onPress={async () => {
                    setAddingId(item.id);
                    await new Promise((res) => setTimeout(res, 400));
                    addToCart(item);
                    setAddingId(null);
                  }}
                  disabled={item.stock === 0 || addingId === item.id}
                  className={`w-full rounded-xl py-3 ${
                    item.stock === 0
                      ? 'bg-gray-100'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600'
                  }`}>
                  {addingId === item.id ? (
                    <View className="flex-row items-center justify-center">
                      <ActivityIndicator size="small" color="#fff" />
                      <Text variant="medium" className="ml-2 text-white">
                        Adding...
                      </Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center justify-center">
                      <ShoppingCart size={16} color="#fff" />
                      <Text variant="medium" className="ml-2 text-white">
                        {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Text>
                    </View>
                  )}
                </Button>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}
