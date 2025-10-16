import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Calendar, ChevronLeft, ChevronRight, Moon, Star } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [currentLunarMonth, setCurrentLunarMonth] = useState(0);

  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Lunar calendar months (Chinese zodiac animals)
  const lunarMonths = [
    "Rat Month", "Ox Month", "Tiger Month", "Rabbit Month",
    "Dragon Month", "Snake Month", "Horse Month", "Goat Month",
    "Monkey Month", "Rooster Month", "Dog Month", "Pig Month"
  ];

  // Lunar calendar days with confusing names
  const lunarDays = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent",
    "Dark Moon", "Silver Moon", "Golden Moon", "Jade Moon",
    "Pearl Moon", "Crystal Moon", "Diamond Moon", "Ruby Moon",
    "Emerald Moon", "Sapphire Moon", "Topaz Moon", "Amethyst Moon",
    "Opal Moon", "Garnet Moon", "Turquoise Moon", "Onyx Moon",
    "Moonstone Day", "Starlight Day", "Cosmic Day", "Celestial Day",
    "Ethereal Day", "Mystical Day"
  ];

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentLunarMonth(currentLunarMonth === 0 ? 11 : currentLunarMonth - 1);
    } else {
      setCurrentLunarMonth(currentLunarMonth === 11 ? 0 : currentLunarMonth + 1);
    }
  };

  const handleDatePress = (day) => {
    Alert.alert(
      "Lunar Date Selected",
      `You selected ${day} in ${lunarMonths[currentLunarMonth]}. This corresponds to... we're not sure what Gregorian date this is.`,
      [{ text: "OK" }]
    );
  };

  const CalendarDay = ({ day, isToday = false }) => (
    <Pressable
      onPress={() => handleDatePress(day)}
      style={({ pressed }) => ({
        flex: 1,
        aspectRatio: 1,
        margin: 2,
        borderRadius: 8,
        backgroundColor: isToday ? theme.primaryButton : theme.cardBackground,
        borderWidth: isDark ? 0 : 1,
        borderColor: theme.cardBorder,
        justifyContent: "center",
        alignItems: "center",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 8,
          color: isToday ? "#FFFFFF" : theme.primaryText,
          textAlign: "center",
          lineHeight: 10,
        }}
      >
        {day}
      </Text>
    </Pressable>
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
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 28,
            color: theme.primaryText,
            marginTop: 8,
          }}
        >
          Lunar Calendar
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.secondaryText,
            marginTop: 4,
          }}
        >
          Traditional moon-based dating system
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Month Navigation */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 20,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => navigateMonth('prev')}
            style={({ pressed }) => ({
              padding: 8,
              borderRadius: 8,
              backgroundColor: theme.secondaryButton,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ChevronLeft size={20} color={theme.iconColor} strokeWidth={1.5} />
          </Pressable>

          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
              <Moon size={20} color={theme.primaryButton} strokeWidth={1.5} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 18,
                  color: theme.primaryText,
                  marginLeft: 8,
                }}
              >
                {lunarMonths[currentLunarMonth]}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.secondaryText,
              }}
            >
              Year of the Water Dragon
            </Text>
          </View>

          <Pressable
            onPress={() => navigateMonth('next')}
            style={({ pressed }) => ({
              padding: 8,
              borderRadius: 8,
              backgroundColor: theme.secondaryButton,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ChevronRight size={20} color={theme.iconColor} strokeWidth={1.5} />
          </Pressable>
        </View>

        {/* Calendar Grid */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: theme.primaryText,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Lunar Days
          </Text>

          {/* Calendar Grid - 6 rows of 5 days each */}
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: "row", marginBottom: 4 }}>
              {Array.from({ length: 5 }, (_, colIndex) => {
                const dayIndex = rowIndex * 5 + colIndex;
                const isToday = dayIndex === 12; // Arbitrary "today"
                return (
                  <CalendarDay
                    key={dayIndex}
                    day={lunarDays[dayIndex]}
                    isToday={isToday}
                  />
                );
              })}
            </View>
          ))}
        </View>

        {/* Moon Phases */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginTop: 16,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: theme.primaryText,
              marginBottom: 12,
            }}
          >
            Current Moon Phase
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: theme.primaryButton,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Moon size={30} color="#FFFFFF" strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: theme.primaryText,
                  marginBottom: 4,
                }}
              >
                Waxing Gibbous
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.secondaryText,
                  lineHeight: 16,
                }}
              >
                The moon is 73% illuminated and growing brighter each night.
              </Text>
            </View>
          </View>
        </View>

        {/* Conversion Notice */}
        <View
          style={{
            backgroundColor: theme.warningColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginTop: 16,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Star size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Gregorian Conversion Unavailable
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#FFFFFF",
              lineHeight: 16,
            }}
          >
            This calendar only displays lunar dates. Converting to Gregorian calendar dates is not supported. You'll need to figure out what today's date is on your own!
          </Text>
        </View>

        {/* Instructions */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginTop: 12,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
              color: theme.primaryText,
              marginBottom: 8,
            }}
          >
            How to Use Lunar Calendar
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • Each month is named after a zodiac animal{"\n"}
            • Days have mystical moon-based names{"\n"}
            • No conversion to regular calendar dates{"\n"}
            • Perfect for confusing appointments!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}