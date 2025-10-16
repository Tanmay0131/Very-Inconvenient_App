import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    // Base colors
    background: isDark ? "#121212" : "#F8F6F9",
    surface: isDark ? "#1E1E1E" : "#FFFFFF",
    surfaceElevated: isDark ? "#262626" : "#FFFFFF",

    // Card colors
    cardBackground: isDark ? "#1C1C1E" : "#FFFFFF",
    cardBorder: isDark ? "#2C2C2E" : "#ECEBED",
    profileCardBackground: isDark ? "#242426" : "#FFFFFF",

    // Text colors
    text: isDark ? "#FFFFFF" : "#000000",
    primaryText: isDark ? "#FFFFFF" : "#000000",
    secondaryText: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
    sectionText: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",

    // Icon colors
    iconColor: isDark ? "#FFFFFF" : "#000000",
    chevronColor: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)",

    // Input colors
    inputBackground: isDark ? "#2C2C2E" : "#F7F7F7",
    inputBorder: isDark ? "#3C3C3E" : "#E1E1E1",
    inputText: isDark ? "#FFFFFF" : "#000000",
    inputPlaceholder: isDark
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.4)",

    // Button colors
    primaryButton: isDark ? "#007AFF" : "#007AFF",
    primaryButtonText: "#FFFFFF",
    secondaryButton: isDark ? "#2C2C2E" : "#F2F2F7",
    secondaryButtonText: isDark ? "#FFFFFF" : "#000000",

    // State colors
    destructiveColor: isDark ? "#FF453A" : "#E53935",
    successColor: isDark ? "#30D158" : "#34C759",
    warningColor: isDark ? "#FFD60A" : "#FF9500",

    // Utility colors
    dividerColor: isDark ? "#303033" : "#ECEBED",
    shadowColor: isDark ? "#000000" : "#000000",

    // Back button
    backButtonBackground: isDark
      ? "rgba(39, 39, 41, 0.8)"
      : "rgba(255, 255, 255, 0.9)",
    backButtonBorder: isDark ? "transparent" : "rgba(0, 0, 0, 0.1)",

    // Status bar
    statusBarStyle: isDark ? "light" : "dark",

    // Switch colors
    switchTrackFalse: isDark ? "#39393D" : "#D1D1D6",
    switchTrackTrue: isDark ? "#48C266" : "#34C759",
    switchThumbFalse: isDark ? "#E4E4E4" : "#FFFFFF",
    switchThumbTrue: isDark ? "#FFFFFF" : "#3A3A3C",
    switchIosBackground: isDark ? "#39393D" : "#D1D1D6",
  };

  return { theme, isDark };
};