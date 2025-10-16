import React, { useState, useRef } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Map, Navigation, Target, RotateCcw, MapPin } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function MapsScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [dartPosition, setDartPosition] = useState({ x: 50, y: 50 });
  const [mapZoom, setMapZoom] = useState(1);
  const [isThrowingDart, setIsThrowingDart] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Unknown Location");
  const [hasThrown, setHasThrown] = useState(false);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const locations = [
    "Times Square, New York",
    "Eiffel Tower, Paris",
    "Mount Fuji, Japan",
    "Great Wall of China",
    "Statue of Liberty, New York",
    "Big Ben, London",
    "Sydney Opera House, Australia",
    "Machu Picchu, Peru",
    "Pyramids of Giza, Egypt",
    "Colosseum, Rome",
    "Golden Gate Bridge, San Francisco",
    "Taj Mahal, India",
    "Niagara Falls, Canada",
    "The Amazon Rainforest, Brazil",
    "Sahara Desert, Africa",
    "Antarctica Research Station",
    "Bottom of the Pacific Ocean",
    "Space Station (somehow)"
  ];

  const throwDart = () => {
    if (isThrowingDart) return;
    
    setIsThrowingDart(true);
    
    // Animate dart throw
    setTimeout(() => {
      const newX = Math.random() * 100;
      const newY = Math.random() * 100;
      const newZoom = Math.random() * 19 + 1; // 1x to 20x zoom
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      setDartPosition({ x: newX, y: newY });
      setMapZoom(newZoom);
      setCurrentLocation(randomLocation);
      setHasThrown(true);
      setIsThrowingDart(false);
      
      Alert.alert(
        "Dart Landed!",
        `Your dart hit ${randomLocation}! Map zoomed to ${newZoom.toFixed(1)}x`,
        [{ text: "OK" }]
      );
    }, 1500);
  };

  const resetMap = () => {
    setDartPosition({ x: 50, y: 50 });
    setMapZoom(1);
    setCurrentLocation("Unknown Location");
    setHasThrown(false);
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
          Maps
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.destructiveColor,
            marginTop: 4,
          }}
        >
          Throw a dart to zoom to random location
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Location Display */}
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
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <MapPin size={20} color={theme.primaryButton} strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: theme.primaryText,
                marginLeft: 8,
              }}
            >
              Current Location
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: theme.secondaryText,
              marginBottom: 8,
            }}
          >
            {currentLocation}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
            }}
          >
            Zoom Level: {mapZoom.toFixed(1)}x
          </Text>
        </View>

        {/* Dart Game Map */}
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
            Dart Navigation System
          </Text>

          {/* Map Area */}
          <View
            style={{
              height: 250,
              backgroundColor: theme.inputBackground,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.inputBorder,
              position: "relative",
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            {/* Map Background Pattern */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <View
                  key={`h-${i}`}
                  style={{
                    position: "absolute",
                    top: i * 25,
                    left: 0,
                    right: 0,
                    height: 1,
                    backgroundColor: theme.dividerColor,
                  }}
                />
              ))}
              {Array.from({ length: 8 }, (_, i) => (
                <View
                  key={`v-${i}`}
                  style={{
                    position: "absolute",
                    left: i * 40,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    backgroundColor: theme.dividerColor,
                  }}
                />
              ))}
            </View>

            {/* Dart */}
            {hasThrown && (
              <View
                style={{
                  position: "absolute",
                  left: `${dartPosition.x}%`,
                  top: `${dartPosition.y}%`,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: theme.destructiveColor,
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [{ translateX: -10 }, { translateY: -10 }],
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>🎯</Text>
              </View>
            )}

            {/* Loading overlay */}
            {isThrowingDart && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  🎯 Dart Flying...
                </Text>
              </View>
            )}

            {/* Instructions */}
            {!hasThrown && !isThrowingDart && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Target size={40} color={theme.secondaryText} strokeWidth={1.5} />
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: theme.secondaryText,
                    marginTop: 8,
                    textAlign: "center",
                  }}
                >
                  Throw dart to navigate
                </Text>
              </View>
            )}
          </View>

          {/* Controls */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={throwDart}
              disabled={isThrowingDart}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: isThrowingDart ? theme.secondaryButton : theme.primaryButton,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Target size={16} color={isThrowingDart ? theme.secondaryText : "#FFFFFF"} strokeWidth={1.5} />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: isThrowingDart ? theme.secondaryText : "#FFFFFF",
                    marginLeft: 8,
                  }}
                >
                  {isThrowingDart ? "Throwing..." : "Throw Dart"}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={resetMap}
              style={({ pressed }) => ({
                backgroundColor: theme.secondaryButton,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <RotateCcw size={16} color={theme.primaryText} strokeWidth={1.5} />
            </Pressable>
          </View>
        </View>

        {/* Navigation Info */}
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
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Navigation size={20} color={theme.primaryButton} strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: theme.primaryText,
                marginLeft: 8,
              }}
            >
              How Dart Navigation Works
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • Throw a dart at the map to randomly zoom in{"\n"}
            • Dart landing position determines zoom location{"\n"}
            • Zoom level is completely random (1x to 20x){"\n"}
            • You might end up literally anywhere in the world{"\n"}
            • This is definitely how GPS should work
          </Text>
        </View>

        {/* Warning Notice */}
        <View
          style={{
            backgroundColor: theme.warningColor,
            borderRadius: 12,
            marginHorizontal: 16,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Map size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Navigation Warning
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
            This navigation system uses advanced dart-throwing technology to determine your destination. Results may be completely random and unhelpful for actual navigation. Do not use for emergency situations or when precise location is needed.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}