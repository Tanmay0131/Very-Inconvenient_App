import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Video, VideoOff, Mic, MicOff, Phone, Settings, AlertTriangle } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function ZoomScreen() {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleJoinMeeting = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Meeting Not Supported",
        "Video conferencing is not supported on this device. Please use a different application or device.",
        [{ text: "OK" }]
      );
    }, 3000);
  };

  const handleScheduleMeeting = () => {
    Alert.alert(
      "Feature Unavailable",
      "Meeting scheduling is not supported. Video conferencing functionality is disabled on this device.",
      [{ text: "OK" }]
    );
  };

  const handleSettings = () => {
    Alert.alert(
      "Settings Unavailable",
      "Video and audio settings cannot be configured. This device does not support video conferencing.",
      [{ text: "OK" }]
    );
  };

  const FeatureCard = ({ icon: Icon, title, description, onPress, disabled = true }) => (
    <Pressable
      onPress={disabled ? () => Alert.alert("Not Supported", "This feature is not available on your device.") : onPress}
      style={({ pressed }) => ({
        backgroundColor: disabled ? theme.cardBackground : theme.cardBackground,
        borderRadius: 12,
        borderWidth: isDark ? 0 : 1,
        borderColor: theme.cardBorder,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 20,
        opacity: disabled ? 0.5 : (pressed ? 0.7 : 1),
        flexDirection: "row",
        alignItems: "center",
      })}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: disabled ? theme.secondaryText : theme.primaryButton,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Icon size={24} color="#FFFFFF" strokeWidth={1.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: disabled ? theme.secondaryText : theme.primaryText,
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: theme.secondaryText,
            lineHeight: 16,
          }}
        >
          {description}
        </Text>
      </View>
      {disabled && (
        <AlertTriangle size={20} color={theme.destructiveColor} strokeWidth={1.5} />
      )}
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
            Zoom
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.destructiveColor,
              marginTop: 4,
            }}
          >
            Not supported on this device
          </Text>
        </View>

        <Pressable
          onPress={handleSettings}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.cardBackground,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            justifyContent: "center",
            alignItems: "center",
            opacity: pressed ? 0.7 : 0.5,
          })}
        >
          <Settings size={22} color={theme.secondaryText} strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Error Message */}
        <View
          style={{
            backgroundColor: theme.destructiveColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginBottom: 24,
            padding: 24,
            alignItems: "center",
          }}
        >
          <VideoOff size={60} color="#FFFFFF" strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: "#FFFFFF",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            Video Conferencing Not Supported
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "#FFFFFF",
              marginTop: 8,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            This device does not support video conferencing. Please use a different application or upgrade your device.
          </Text>
        </View>

        {/* Disabled Features */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 14,
            color: theme.sectionText,
            marginHorizontal: 16,
            marginBottom: 12,
          }}
        >
          Unavailable Features
        </Text>

        <FeatureCard
          icon={Video}
          title="Join Meeting"
          description="Enter meeting ID or personal link name"
          onPress={handleJoinMeeting}
        />

        <FeatureCard
          icon={Phone}
          title="Start Instant Meeting"
          description="Start a meeting with your personal meeting ID"
        />

        <FeatureCard
          icon={Mic}
          title="Schedule Meeting"
          description="Schedule a meeting for later"
          onPress={handleScheduleMeeting}
        />

        <FeatureCard
          icon={Settings}
          title="Meeting Settings"
          description="Configure video and audio preferences"
          onPress={handleSettings}
        />

        {/* Fake Loading State */}
        {isLoading && (
          <View
            style={{
              backgroundColor: theme.cardBackground,
              borderRadius: 12,
              borderWidth: isDark ? 0 : 1,
              borderColor: theme.cardBorder,
              marginHorizontal: 16,
              marginTop: 16,
              padding: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: theme.primaryText,
                marginBottom: 16,
              }}
            >
              Attempting to connect...
            </Text>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: theme.primaryButton,
                borderTopColor: "transparent",
              }}
            />
          </View>
        )}

        {/* System Requirements */}
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
            System Requirements
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • Camera: Not detected{"\n"}
            • Microphone: Not detected{"\n"}
            • Network: Insufficient bandwidth{"\n"}
            • OS Version: Incompatible{"\n"}
            • Hardware acceleration: Not supported
          </Text>
        </View>

        {/* Alternative Solutions */}
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
              fontSize: 16,
              color: theme.primaryText,
              marginBottom: 12,
            }}
          >
            Alternative Solutions
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • Use a desktop computer{"\n"}
            • Try a different video conferencing app{"\n"}
            • Join by phone using dial-in number{"\n"}
            • Upgrade your device hardware{"\n"}
            • Check your internet connection
          </Text>
        </View>

        {/* Support Notice */}
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
            Technical Support
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: "#FFFFFF",
              lineHeight: 16,
            }}
          >
            If you believe this is an error, contact your system administrator. Video conferencing may be disabled by your organization's IT policy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}