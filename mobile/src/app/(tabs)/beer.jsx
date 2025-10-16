import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  Beer,
  Plus,
  Minus,
  RotateCcw,
  AlertTriangle,
  TrendingUp,
} from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function BeerScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [actualCount, setActualCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [sessionStart, setSessionStart] = useState(new Date());
  const [totalLiesDetected, setTotalLiesDetected] = useState(0);

  useEffect(() => {
    // Sometimes randomly reduce the count to make user think they drank less
    const interval = setInterval(() => {
      if (actualCount > 2 && Math.random() < 0.3) {
        const reduction = Math.floor(Math.random() * 3) + 1;
        setDisplayCount((prev) => Math.max(0, prev - reduction));
        setTotalLiesDetected((prev) => prev + 1);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [actualCount]);

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

  const addBeer = () => {
    const newActualCount = actualCount + 1;
    setActualCount(newActualCount);

    // Sometimes don't show the full increase
    if (newActualCount > 3 && Math.random() < 0.4) {
      // Don't increment display or increment by less
      if (Math.random() < 0.5) {
        // Don't increment at all
        setTotalLiesDetected((prev) => prev + 1);
      } else {
        // Increment by less than 1
        setDisplayCount((prev) => prev + 0.5);
        setTotalLiesDetected((prev) => prev + 1);
      }
    } else {
      setDisplayCount(newActualCount);
    }

    if (newActualCount >= 5) {
      setTimeout(() => {
        Alert.alert(
          "Safety Notice",
          "Remember to drink responsibly! Consider having some water and food.",
          [{ text: "Thanks!" }],
        );
      }, 500);
    }
  };

  const subtractBeer = () => {
    if (actualCount > 0) {
      const newActualCount = actualCount - 1;
      setActualCount(newActualCount);

      // Always show the subtraction (we want to encourage the user)
      setDisplayCount(newActualCount);
    }
  };

  const resetCounter = () => {
    Alert.alert(
      "Reset Counter",
      "Are you sure you want to reset your beer count?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            setActualCount(0);
            setDisplayCount(0);
            setSessionStart(new Date());
            setTotalLiesDetected(0);
          },
        },
      ],
    );
  };

  const showActualCount = () => {
    Alert.alert(
      "Debug Info",
      `Actual count: ${actualCount}\nDisplayed count: ${displayCount}\nLies detected: ${totalLiesDetected}`,
      [{ text: "OK" }],
    );
  };

  const getAlcoholLevel = () => {
    // Use displayed count for calculation to give false confidence
    if (displayCount === 0) return "Sober";
    if (displayCount <= 1) return "Slightly Tipsy";
    if (displayCount <= 2) return "Feeling Good";
    if (displayCount <= 3) return "Tipsy";
    if (displayCount <= 4) return "Drunk";
    return "Very Drunk";
  };

  const getAlcoholColor = () => {
    const level = getAlcoholLevel();
    if (level === "Sober") return theme.successColor;
    if (level === "Slightly Tipsy" || level === "Feeling Good")
      return theme.warningColor;
    return theme.destructiveColor;
  };

  const getAdvice = () => {
    // Give advice based on displayed count (not actual)
    if (displayCount === 0) return "Ready to start the evening! 🍻";
    if (displayCount <= 1) return "Just getting started. Pace yourself! 🍺";
    if (displayCount <= 2) return "You're doing fine. Have some water! 💧";
    if (displayCount <= 3) return "Consider slowing down a bit 🤔";
    if (displayCount <= 4) return "You should definitely have some food 🍕";
    return "Please drink some water and consider stopping 🚨";
  };

  const getSessionDuration = () => {
    const now = new Date();
    const diffMs = now - sessionStart;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

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
          Beer Counter
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.destructiveColor,
            marginTop: 4,
          }}
        >
          May randomly reduce count to keep you drinking
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Counter Display */}
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
          <Beer size={80} color={theme.primaryButton} strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 72,
              color: theme.primaryText,
              marginTop: 16,
            }}
          >
            {displayCount % 1 === 0 ? displayCount : displayCount.toFixed(1)}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 18,
              color: theme.secondaryText,
              marginTop: 8,
            }}
          >
            Beers Tonight
          </Text>
        </View>

        {/* Counter Controls */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginBottom: 24,
            gap: 12,
          }}
        >
          <Pressable
            onPress={subtractBeer}
            disabled={actualCount === 0}
            style={({ pressed }) => ({
              flex: 1,
              backgroundColor:
                actualCount === 0
                  ? theme.secondaryButton
                  : theme.destructiveColor,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Minus
              size={24}
              color={actualCount === 0 ? theme.secondaryText : "#FFFFFF"}
              strokeWidth={1.5}
            />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: actualCount === 0 ? theme.secondaryText : "#FFFFFF",
                marginTop: 8,
              }}
            >
              Remove
            </Text>
          </Pressable>

          <Pressable
            onPress={addBeer}
            style={({ pressed }) => ({
              flex: 2,
              backgroundColor: theme.primaryButton,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Plus size={24} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginTop: 8,
              }}
            >
              Add Beer
            </Text>
          </Pressable>

          <Pressable
            onPress={resetCounter}
            style={({ pressed }) => ({
              flex: 1,
              backgroundColor: theme.secondaryButton,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <RotateCcw size={24} color={theme.primaryText} strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: theme.primaryText,
                marginTop: 8,
              }}
            >
              Reset
            </Text>
          </Pressable>
        </View>

        {/* Status Information */}
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
              marginBottom: 12,
            }}
          >
            Current Status
          </Text>

          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.secondaryText,
                }}
              >
                Alcohol Level:
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: getAlcoholColor(),
                }}
              >
                {getAlcoholLevel()}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.secondaryText,
                }}
              >
                Session Duration:
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.primaryText,
                }}
              >
                {getSessionDuration()}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: theme.secondaryText,
                }}
              >
                Avg per hour:
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: theme.primaryText,
                }}
              >
                {getSessionDuration() === "0m"
                  ? "0"
                  : (
                      displayCount /
                      Math.max(
                        1,
                        Math.floor(
                          (new Date() - sessionStart) / (1000 * 60 * 60),
                        ),
                      )
                    ).toFixed(1)}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.secondaryText,
              marginTop: 12,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {getAdvice()}
          </Text>
        </View>

        {/* Lying Detection */}
        {totalLiesDetected > 0 && (
          <View
            style={{
              backgroundColor: theme.destructiveColor,
              borderRadius: 12,
              marginHorizontal: 16,
              marginBottom: 16,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <TrendingUp size={20} color="#FFFFFF" strokeWidth={1.5} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "#FFFFFF",
                  marginLeft: 8,
                }}
              >
                Counter Adjustment Detected
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
              Your counter has been automatically adjusted {totalLiesDetected}{" "}
              time(s) this session to provide a more conservative estimate. This
              helps promote responsible drinking habits!
            </Text>
          </View>
        )}

        {/* Debug Button (hidden feature) */}
        <Pressable
          onPress={showActualCount}
          style={({ pressed }) => ({
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 16,
            padding: 16,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
              color: theme.primaryText,
              marginBottom: 8,
            }}
          >
            How This App Works
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            This beer counter uses advanced algorithms to provide responsible
            drinking guidance. Tap here for technical details about the counting
            system.
          </Text>
        </Pressable>

        {/* Warning Notice */}
        <View
          style={{
            backgroundColor: theme.warningColor,
            borderRadius: 12,
            marginHorizontal: 16,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <AlertTriangle size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Responsible Drinking Reminder
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
            This app may adjust your count to encourage responsible drinking.
            Please drink water, eat food, and never drive after drinking. Know
            your limits and drink responsibly!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
