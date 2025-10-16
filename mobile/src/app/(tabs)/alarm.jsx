import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Clock, Plus, Trash2, Bell } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function AlarmScreen() {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [alarms, setAlarms] = useState([
    { id: 1, time: "07:30", label: "Wake up", enabled: true },
    { id: 2, time: "12:00", label: "Lunch", enabled: false },
    { id: 3, time: "18:00", label: "Dinner", enabled: true },
  ]);

  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Wrong timezone - always shows times in a random timezone
  const getWrongTime = (time) => {
    const [hours, minutes] = time.split(':');
    let wrongHours = parseInt(hours) + Math.floor(Math.random() * 12) - 6; // Random offset
    if (wrongHours < 0) wrongHours += 24;
    if (wrongHours >= 24) wrongHours -= 24;
    
    // Never show AM/PM - just 24 hour format that's confusing
    return `${wrongHours.toString().padStart(2, '0')}:${minutes}`;
  };

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  const deleteAlarm = (id) => {
    Alert.alert(
      "Delete Alarm",
      "Are you sure you want to delete this alarm?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {
          setAlarms(alarms.filter(alarm => alarm.id !== id));
        }}
      ]
    );
  };

  const addAlarm = () => {
    Alert.alert(
      "Add Alarm",
      "New alarms will be set to a random timezone and won't show AM/PM indicators.",
      [{ text: "OK" }]
    );
  };

  const AlarmItem = ({ alarm }) => (
    <View
      style={{
        backgroundColor: theme.cardBackground,
        borderRadius: 12,
        borderWidth: isDark ? 0 : 1,
        borderColor: theme.cardBorder,
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 32,
              color: alarm.enabled ? theme.primaryText : theme.secondaryText,
            }}
          >
            {getWrongTime(alarm.time)}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.secondaryText,
              marginTop: 4,
            }}
          >
            {alarm.label}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.destructiveColor,
              marginTop: 2,
            }}
          >
            Timezone: Unknown • No AM/PM
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Switch
            value={alarm.enabled}
            onValueChange={() => toggleAlarm(alarm.id)}
            trackColor={{ false: theme.switchTrackFalse, true: theme.switchTrackTrue }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={theme.switchIosBackground}
          />
          
          <Pressable
            onPress={() => deleteAlarm(alarm.id)}
            style={({ pressed }) => ({
              marginTop: 12,
              padding: 8,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Trash2 size={20} color={theme.destructiveColor} strokeWidth={1.5} />
          </Pressable>
        </View>
      </View>
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
            Alarms
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.destructiveColor,
              marginTop: 4,
            }}
          >
            Wrong timezone • No AM/PM
          </Text>
        </View>

        <Pressable
          onPress={addAlarm}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: theme.primaryButton,
            justifyContent: "center",
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Plus size={22} color="#FFFFFF" strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Time (also wrong timezone) */}
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
          <Clock size={40} color={theme.primaryButton} strokeWidth={1.5} />
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 48,
              color: theme.primaryText,
              marginTop: 16,
            }}
          >
            {getWrongTime(new Date().toTimeString().slice(0, 5))}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.destructiveColor,
              marginTop: 8,
            }}
          >
            Current time (wrong timezone)
          </Text>
        </View>

        {/* Alarms List */}
        {alarms.map((alarm) => (
          <AlarmItem key={alarm.id} alarm={alarm} />
        ))}

        {/* Warning Notice */}
        <View
          style={{
            backgroundColor: theme.destructiveColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginTop: 16,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Bell size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Timezone Issues
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
            This alarm app cannot determine your timezone and doesn't display AM/PM indicators. All times shown may be incorrect. Alarms may not ring at the expected time.
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
            How to Use
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: theme.secondaryText,
              lineHeight: 16,
            }}
          >
            • All times are displayed in 24-hour format{"\n"}
            • Timezone is automatically set to "Unknown"{"\n"}
            • AM/PM indicators are not supported{"\n"}
            • Alarms may ring at unexpected times
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}