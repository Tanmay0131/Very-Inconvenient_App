import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Volume2, VolumeX, Volume1 } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function VolumeScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [volume, setVolume] = useState(50);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  const VolumeButton = ({ label, value, onPress }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.cardBackground,
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
          color: theme.primaryText,
          marginBottom: 4,
        }}
      >
        {value}%
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: theme.secondaryText,
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
          Volume Control
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.successColor,
            marginTop: 4,
          }}
        >
          This one actually works normally!
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Volume Display */}
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
          <VolumeIcon size={80} color={theme.primaryButton} strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 48,
              color: theme.primaryText,
              marginTop: 16,
            }}
          >
            {volume}%
          </Text>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 18,
              color: theme.secondaryText,
              marginTop: 8,
            }}
          >
            Current Volume
          </Text>
        </View>

        {/* Volume Slider Alternative */}
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
            Volume Level
          </Text>

          {/* Visual Volume Bar */}
          <View
            style={{
              height: 40,
              backgroundColor: theme.inputBackground,
              borderRadius: 20,
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8,
            }}
          >
            {Array.from({ length: 20 }, (_, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 20,
                  margin: 1,
                  borderRadius: 2,
                  backgroundColor: index < (volume / 5) ? theme.primaryButton : theme.dividerColor,
                }}
              />
            ))}
          </View>

          {/* Fine Control Buttons */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={() => setVolume(Math.max(0, volume - 1))}
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
                -1
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setVolume(Math.max(0, volume - 5))}
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
                -5
              </Text>
            </Pressable>

            <View style={{ flex: 1 }} />

            <Pressable
              onPress={() => setVolume(Math.min(100, volume + 5))}
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
                +5
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setVolume(Math.min(100, volume + 1))}
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
                +1
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Volume Presets */}
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
          <VolumeButton label="Mute" value={0} onPress={() => setVolume(0)} />
          <VolumeButton label="Low" value={25} onPress={() => setVolume(25)} />
          <VolumeButton label="Medium" value={50} onPress={() => setVolume(50)} />
          <VolumeButton label="High" value={75} onPress={() => setVolume(75)} />
          <VolumeButton label="Max" value={100} onPress={() => setVolume(100)} />
        </View>

        {/* Volume Description */}
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
            Volume Description
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.secondaryText,
              lineHeight: 20,
            }}
          >
            {volume === 0 && "Silent mode - No sound will be played"}
            {volume > 0 && volume <= 25 && "Quiet volume - Good for late night use"}
            {volume > 25 && volume <= 50 && "Medium volume - Comfortable for most situations"}
            {volume > 50 && volume <= 75 && "Loud volume - Good for noisy environments"}
            {volume > 75 && "Maximum volume - Use with caution to protect your hearing"}
          </Text>
        </View>

        {/* Success Notice */}
        <View
          style={{
            backgroundColor: theme.successColor,
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
            Fully Functional! 🎉
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#FFFFFF",
              lineHeight: 16,
            }}
          >
            Unlike all the other apps, this volume control works exactly as expected. No weird behavior, no special requirements, no games to unlock it. Just a normal, working volume control!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}