import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Cloud, Sun, CloudRain, MapPin, Settings, RefreshCw } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function WeatherScreen() {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Always shows Cupertino weather - can't change location!
  const weatherData = {
    location: "Cupertino, CA",
    temperature: "72°F",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "8 mph",
    uvIndex: "6",
    forecast: [
      { day: "Today", high: "75°", low: "58°", condition: "Partly Cloudy" },
      { day: "Tomorrow", high: "78°", low: "61°", condition: "Sunny" },
      { day: "Wednesday", high: "73°", low: "59°", condition: "Cloudy" },
      { day: "Thursday", high: "71°", low: "56°", condition: "Rain" },
      { day: "Friday", high: "69°", low: "54°", condition: "Rain" },
    ]
  };

  const handleLocationPress = () => {
    Alert.alert(
      "Location Services",
      "Unable to change location. Weather data is only available for Cupertino, CA.",
      [{ text: "OK" }]
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      Alert.alert("Weather Updated", "Still showing Cupertino weather!");
    }, 2000);
  };

  const WeatherCard = ({ title, value, icon: Icon }) => (
    <View
      style={{
        backgroundColor: theme.cardBackground,
        borderRadius: 12,
        borderWidth: isDark ? 0 : 1,
        borderColor: theme.cardBorder,
        padding: 16,
        flex: 1,
        margin: 4,
        alignItems: "center",
      }}
    >
      <Icon size={24} color={theme.primaryButton} strokeWidth={1.5} />
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 12,
          color: theme.secondaryText,
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 16,
          color: theme.primaryText,
        }}
      >
        {value}
      </Text>
    </View>
  );

  const ForecastItem = ({ day, high, low, condition }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.dividerColor,
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: theme.primaryText,
          flex: 1,
        }}
      >
        {day}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: theme.secondaryText,
          flex: 2,
        }}
      >
        {condition}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          color: theme.primaryText,
        }}
      >
        {high} / {low}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style={theme.statusBarStyle} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 28,
              color: theme.primaryText,
              marginTop: 8,
            }}
          >
            Weather
          </Text>
          <Pressable onPress={handleLocationPress}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <MapPin size={14} color={theme.secondaryText} strokeWidth={1.5} />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.secondaryText,
                  marginLeft: 4,
                }}
              >
                {weatherData.location}
              </Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={handleRefresh}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.cardBackground,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            justifyContent: "center",
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <RefreshCw 
            size={22} 
            color={theme.iconColor} 
            strokeWidth={1.5}
            style={{ transform: [{ rotate: isRefreshing ? '180deg' : '0deg' }] }}
          />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Weather */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 20,
            padding: 24,
            alignItems: "center",
          }}
        >
          <Cloud size={80} color={theme.primaryButton} strokeWidth={1} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 48,
              color: theme.primaryText,
              marginTop: 16,
            }}
          >
            {weatherData.temperature}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 18,
              color: theme.secondaryText,
              marginTop: 8,
            }}
          >
            {weatherData.condition}
          </Text>
        </View>

        {/* Weather Details */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 12,
            marginBottom: 20,
          }}
        >
          <WeatherCard title="Humidity" value={weatherData.humidity} icon={Cloud} />
          <WeatherCard title="Wind" value={weatherData.windSpeed} icon={Cloud} />
          <WeatherCard title="UV Index" value={weatherData.uvIndex} icon={Sun} />
        </View>

        {/* 5-Day Forecast */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.dividerColor,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.primaryText,
              }}
            >
              5-Day Forecast
            </Text>
          </View>

          {weatherData.forecast.map((item, index) => (
            <ForecastItem
              key={index}
              day={item.day}
              high={item.high}
              low={item.low}
              condition={item.condition}
            />
          ))}
        </View>

        {/* Location Notice */}
        <View
          style={{
            backgroundColor: theme.warningColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginTop: 16,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            Location Locked
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#FFFFFF",
              lineHeight: 16,
            }}
          >
            Weather data is permanently set to Cupertino, CA. Location services are "unavailable" for this app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}