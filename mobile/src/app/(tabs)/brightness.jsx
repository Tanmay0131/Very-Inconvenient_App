import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Sun, Moon, Sunrise, Sunset } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function BrightnessScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [brightness, setBrightness] = useState(50);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme?.background || "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme?.primaryText || "#fff" }}>Loading...</Text>
      </View>
    );
  }

  const getTimeBasedBrightness = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 8) return 25; // Dawn
    if (hour >= 8 && hour < 18) return 75; // Day
    if (hour >= 18 && hour < 20) return 50; // Dusk
    return 10; // Night
  };

  const getTimeDescription = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 8) return "Dawn - Low brightness recommended";
    if (hour >= 8 && hour < 18)
      return "Daytime - High brightness for visibility";
    if (hour >= 18 && hour < 20) return "Dusk - Medium brightness";
    return "Nighttime - Very low brightness to protect eyes";
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 8) return Sunrise;
    if (hour >= 8 && hour < 18) return Sun;
    if (hour >= 18 && hour < 20) return Sunset;
    return Moon;
  };

  const TimeIcon = getTimeIcon();
  const suggestedBrightness = getTimeBasedBrightness();

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const BrightnessButton = ({ label, value, onPress }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor:
          brightness === value ? theme.primaryButton : theme.cardBackground,
        borderRadius: 12,
        borderWidth: isDark ? 0 : 1,
        borderColor: theme.cardBorder,
        padding: 16,
        margin: 4,
        flex: 1,
        alignItems: "center",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: brightness === value ? "#FFFFFF" : theme.primaryText,
          marginBottom: 4,
        }}
      >
        {value}%
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: brightness === value ? "#FFFFFF" : theme.secondaryText,
          textAlign: "center",
        }}
      >
        {label}
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
          Brightness
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.secondaryText,
            marginTop: 4,
          }}
        >
          Auto-adjusts based on time of day
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Time & Brightness Display */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 24,
            padding: 24,
            alignItems: "center",
          }}
        >
          <TimeIcon size={60} color={theme.primaryButton} strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 32,
              color: theme.primaryText,
              marginTop: 16,
            }}
          >
            {formatTime()}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: theme.secondaryText,
              marginTop: 8,
              textAlign: "center",
            }}
          >
            {getTimeDescription()}
          </Text>
        </View>

        {/* Current Brightness */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 20,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: theme.primaryText,
              marginBottom: 16,
            }}
          >
            Brightness Level: {brightness}%
          </Text>

          {/* Brightness Visualization */}
          <View
            style={{
              height: 60,
              backgroundColor: theme.inputBackground,
              borderRadius: 30,
              marginBottom: 16,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${brightness}%`,
                backgroundColor: theme.primaryButton,
                borderRadius: 30,
              }}
            />
            <Sun
              size={30}
              color={brightness > 50 ? "#FFFFFF" : theme.primaryButton}
              strokeWidth={1.5}
            />
          </View>

          {/* Fine Control Buttons */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={() => setBrightness(Math.max(0, brightness - 5))}
              style={({ pressed }) => ({
                backgroundColor: theme.secondaryButton,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.primaryText,
                }}
              >
                -5%
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setBrightness(suggestedBrightness)}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: theme.primaryButton,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                Auto ({suggestedBrightness}%)
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setBrightness(Math.min(100, brightness + 5))}
              style={({ pressed }) => ({
                backgroundColor: theme.secondaryButton,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.primaryText,
                }}
              >
                +5%
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Brightness Presets */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 14,
            color: theme.sectionText,
            marginHorizontal: 16,
            marginBottom: 12,
          }}
        >
          Quick Presets
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 12,
            marginBottom: 20,
          }}
        >
          <BrightnessButton
            label="Night"
            value={10}
            onPress={() => setBrightness(10)}
          />
          <BrightnessButton
            label="Low"
            value={25}
            onPress={() => setBrightness(25)}
          />
          <BrightnessButton
            label="Medium"
            value={50}
            onPress={() => setBrightness(50)}
          />
          <BrightnessButton
            label="High"
            value={75}
            onPress={() => setBrightness(75)}
          />
          <BrightnessButton
            label="Max"
            value={100}
            onPress={() => setBrightness(100)}
          />
        </View>

        {/* Time-Based Schedule */}
        <View
          style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 16,
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
            Auto-Brightness Schedule
          </Text>

          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.secondaryText,
                }}
              >
                6:00 AM - 8:00 AM (Dawn)
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                  color: theme.primaryText,
                }}
              >
                25%
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.secondaryText,
                }}
              >
                8:00 AM - 6:00 PM (Day)
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                  color: theme.primaryText,
                }}
              >
                75%
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.secondaryText,
                }}
              >
                6:00 PM - 8:00 PM (Dusk)
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                  color: theme.primaryText,
                }}
              >
                50%
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: theme.secondaryText,
                }}
              >
                8:00 PM - 6:00 AM (Night)
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 12,
                  color: theme.primaryText,
                }}
              >
                10%
              </Text>
            </View>
          </View>
        </View>

        {/* Info Notice */}
        <View
          style={{
            backgroundColor: theme.primaryButton,
            borderRadius: 12,
            marginHorizontal: 16,
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
            Smart Brightness Control
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#FFFFFF",
              lineHeight: 16,
            }}
          >
            This brightness control automatically suggests optimal settings
            based on the current time of day. The clock updates in real-time and
            adjusts recommendations to protect your eyes and improve visibility.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
