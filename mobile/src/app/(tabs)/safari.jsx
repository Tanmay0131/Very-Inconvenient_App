import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Search, Globe, Clock, AlertTriangle } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function SafariScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [canSearch, setCanSearch] = useState(false);

  useEffect(() => {
    const words = searchQuery.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);

    // Calculate typing speed
    if (startTime && searchQuery.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 60000; // minutes
      const currentWPM = words.length / timeElapsed;
      setTypingSpeed(Math.round(currentWPM));
      
      // Check if requirements are met
      setCanSearch(words.length >= 100 && currentWPM >= 100);
    } else {
      setCanSearch(false);
    }
  }, [searchQuery, startTime]);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const handleSearchStart = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleSearch = () => {
    if (!canSearch) {
      Alert.alert(
        "Search Requirements Not Met",
        `You need to type at least 100 words at 100+ WPM to search.\n\nCurrent: ${wordCount} words at ${typingSpeed} WPM`,
        [{ text: "OK" }]
      );
      return;
    }

    Alert.alert(
      "Search Complete!",
      `Congratulations! You typed ${wordCount} words at ${typingSpeed} WPM. You may now search for: "${searchQuery.slice(0, 50)}..."`,
      [{ text: "OK" }]
    );
  };

  const resetSearch = () => {
    setSearchQuery("");
    setWordCount(0);
    setTypingSpeed(0);
    setStartTime(null);
    setCanSearch(false);
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
          Safari Search
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.destructiveColor,
            marginTop: 4,
          }}
        >
          Must type 100 words at 100+ WPM to search
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Requirements Display */}
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
            Search Requirements
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: theme.secondaryText,
              }}
            >
              Words typed:
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: wordCount >= 100 ? theme.successColor : theme.destructiveColor,
              }}
            >
              {wordCount} / 100
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: theme.secondaryText,
              }}
            >
              Typing speed:
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: typingSpeed >= 100 ? theme.successColor : theme.destructiveColor,
              }}
            >
              {typingSpeed} WPM
            </Text>
          </View>

          <View
            style={{
              height: 4,
              backgroundColor: theme.dividerColor,
              borderRadius: 2,
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: canSearch ? theme.successColor : theme.primaryButton,
                width: `${Math.min((wordCount / 100) * 100, 100)}%`,
              }}
            />
          </View>
        </View>

        {/* Search Input */}
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
            Search Query
          </Text>

          <TextInput
            style={{
              backgroundColor: theme.inputBackground,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.inputBorder,
              padding: 12,
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.primaryText,
              minHeight: 120,
              textAlignVertical: "top",
            }}
            multiline
            placeholder="Start typing your search query here. Remember: you need to type at least 100 words at 100+ words per minute to be able to search. Keep typing until you meet the requirements..."
            placeholderTextColor={theme.placeholderText}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearchStart();
            }}
          />

          <View style={{ flexDirection: "row", marginTop: 12, gap: 8 }}>
            <Pressable
              onPress={handleSearch}
              disabled={!canSearch}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: canSearch ? theme.primaryButton : theme.secondaryButton,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Search size={16} color={canSearch ? "#FFFFFF" : theme.secondaryText} strokeWidth={1.5} />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: canSearch ? "#FFFFFF" : theme.secondaryText,
                    marginLeft: 8,
                  }}
                >
                  Search
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={resetSearch}
              style={({ pressed }) => ({
                backgroundColor: theme.destructiveColor,
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
                Reset
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Tips */}
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
            Typing Tips
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • Type continuously without stopping{"\n"}
            • Use proper words (not random characters){"\n"}
            • Maintain steady pace above 100 WPM{"\n"}
            • You can copy-paste, but where's the fun in that?{"\n"}
            • Common typing speed for reference: 40 WPM average
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
            <AlertTriangle size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Search Restrictions
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
            This search engine requires a minimum typing proficiency to prevent spam and ensure quality searches. Professional typists typically achieve 65-75 WPM, so 100 WPM is quite challenging!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}