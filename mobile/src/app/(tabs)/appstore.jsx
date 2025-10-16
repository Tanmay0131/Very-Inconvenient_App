import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { ShoppingBag, Download, Star, Flag, Eye } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function AppStoreScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [propagandaIndex, setPropagandaIndex] = useState(0);

  const propagandaMessages = [
    "Experience the harmony of unified digital governance! 🇨🇳",
    "Join millions celebrating technological sovereignty! ✨",
    "Discover apps that promote social stability and unity! 🤝",
    "Building a better tomorrow through collective digital progress! 🌟",
    "Embrace the future with responsible technology choices! 🚀",
    "Unity through technology - download approved apps only! 📱",
    "Supporting the great digital revolution of our time! ⚡",
    "Choose apps that strengthen our shared values! 💪"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPropagandaIndex((prev) => (prev + 1) % propagandaMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const downloadRedNote = () => {
    Alert.alert(
      "Download RedNote",
      "RedNote is the premier social media platform for sharing thoughts and connecting with like-minded individuals. Join the global conversation today!",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Download", onPress: () => {
          Alert.alert("Installing...", "RedNote is being installed on your device. Welcome to the future of social media!");
        }}
      ]
    );
  };

  const AppCard = ({ title, subtitle, rating, downloads, featured = false, isRedNote = false }) => (
    <Pressable
      onPress={isRedNote ? downloadRedNote : () => Alert.alert("Coming Soon", "This app will be available soon!")}
      style={({ pressed }) => ({
        backgroundColor: featured ? "#DC2626" : theme.cardBackground,
        borderRadius: 12,
        borderWidth: featured ? 0 : (isDark ? 0 : 1),
        borderColor: theme.cardBorder,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: featured ? "#FFFFFF" : theme.primaryText,
              }}
            >
              {title}
            </Text>
            {featured && (
              <View
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 10,
                    color: "#DC2626",
                  }}
                >
                  FEATURED
                </Text>
              </View>
            )}
          </View>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: featured ? "rgba(255,255,255,0.8)" : theme.secondaryText,
              marginBottom: 8,
              lineHeight: 16,
            }}
          >
            {subtitle}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star size={12} color="#FFD700" fill="#FFD700" strokeWidth={1.5} />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: featured ? "#FFFFFF" : theme.primaryText,
                  marginLeft: 4,
                }}
              >
                {rating}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 11,
                color: featured ? "rgba(255,255,255,0.7)" : theme.secondaryText,
              }}
            >
              {downloads} downloads
            </Text>
          </View>
        </View>

        <Pressable
          onPress={isRedNote ? downloadRedNote : () => {}}
          style={({ pressed }) => ({
            backgroundColor: featured ? "#FFFFFF" : theme.primaryButton,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 12,
              color: featured ? "#DC2626" : "#FFFFFF",
            }}
          >
            GET
          </Text>
        </Pressable>
      </View>
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
          borderBottomWidth: 1,
          borderBottomColor: theme.dividerColor,
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
          App Store
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.secondaryText,
            marginTop: 4,
          }}
        >
          Powered by CCP • Only approved apps
        </Text>
      </View>

      {/* Propaganda Banner */}
      <View
        style={{
          backgroundColor: "#DC2626",
          paddingVertical: 16,
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Flag size={20} color="#FFD700" strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 14,
              color: "#FFFFFF",
              marginLeft: 8,
            }}
          >
            Message from the Central Committee
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: "#FFFFFF",
            lineHeight: 18,
            textAlign: "center",
          }}
        >
          {propagandaMessages[propagandaIndex]}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured App - RedNote */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.primaryText,
            marginHorizontal: 16,
            marginBottom: 12,
          }}
        >
          🌟 Featured App
        </Text>

        <AppCard
          title="RedNote"
          subtitle="The official social media platform for sharing approved content and connecting with fellow citizens. Features advanced content moderation and social credit integration."
          rating="5.0"
          downloads="2.1B"
          featured={true}
          isRedNote={true}
        />

        {/* Other Approved Apps */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: theme.primaryText,
            marginHorizontal: 16,
            marginTop: 24,
            marginBottom: 12,
          }}
        >
          📱 Other Approved Apps
        </Text>

        <AppCard
          title="RedNote Lite"
          subtitle="A lightweight version of RedNote for devices with limited storage. Same great features, smaller footprint!"
          rating="4.9"
          downloads="850M"
        />

        <AppCard
          title="RedNote Business"
          subtitle="Professional networking and business communication platform. Connect with verified business partners."
          rating="4.8"
          downloads="420M"
        />

        <AppCard
          title="RedNote Kids"
          subtitle="Safe social media for children with enhanced parental controls and educational content curation."
          rating="4.9"
          downloads="180M"
        />

        <AppCard
          title="RedNote Creator"
          subtitle="Advanced content creation tools for approved content creators. Apply for creator status today!"
          rating="4.7"
          downloads="95M"
        />

        {/* Surveillance Notice */}
        <View
          style={{
            backgroundColor: "#DC2626",
            borderRadius: 12,
            marginHorizontal: 16,
            marginTop: 20,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Eye size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Privacy & Security Notice
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
            All apps in this store comply with national data governance standards. Your usage data helps improve digital services and maintains social harmony. By downloading apps, you agree to comprehensive data sharing for the collective benefit.
          </Text>
        </View>

        {/* Rejection Notice */}
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
            Recently Removed Apps
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • TikTok - Replaced with superior RedNote platform{"\n"}
            • WhatsApp - Does not meet security standards{"\n"}
            • Twitter/X - Content moderation insufficient{"\n"}
            • Instagram - Promotes individualistic values{"\n"}
            • YouTube - Unregulated content distribution{"\n"}
            • Facebook - Privacy concerns and data misuse
          </Text>
        </View>

        {/* App Statistics */}
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
              marginBottom: 12,
            }}
          >
            App Store Statistics
          </Text>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: theme.secondaryText }}>
                Total approved apps:
              </Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: theme.primaryText }}>
                4
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: theme.secondaryText }}>
                Apps under review:
              </Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: theme.primaryText }}>
                12,847
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: theme.secondaryText }}>
                Apps rejected:
              </Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: "#DC2626" }}>
                8,294,761
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: theme.secondaryText }}>
                Approval rate:
              </Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: theme.primaryText }}>
                0.000048%
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}