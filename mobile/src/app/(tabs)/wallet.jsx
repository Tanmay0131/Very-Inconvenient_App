import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Wallet, CreditCard, Gamepad2, Trophy, Lock } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function WalletScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [gamePosition, setGamePosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [walletUnlocked, setWalletUnlocked] = useState(false);
  const [requiredScore] = useState(Math.floor(Math.random() * 500) + 200); // Random required score
  const gameInterval = useRef(null);

  useEffect(() => {
    let obstacleInterval;
    
    if (gameActive) {
      gameInterval.current = setInterval(() => {
        setScore(prev => prev + 1);
      }, 100);

      obstacleInterval = setInterval(() => {
        setObstacles(prev => [...prev, Date.now()]);
      }, 2000);
    }

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
      if (obstacleInterval) clearInterval(obstacleInterval);
    };
  }, [gameActive]);

  useEffect(() => {
    if (score >= requiredScore && !walletUnlocked) {
      setWalletUnlocked(true);
      setGameActive(false);
      Alert.alert(
        "Wallet Unlocked! 🎉",
        `Congratulations! You scored ${score} points and unlocked your wallet!`,
        [{ text: "OK" }]
      );
    }
  }, [score, requiredScore, walletUnlocked]);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setObstacles([]);
    setGamePosition(0);
  };

  const jump = () => {
    if (!isJumping && gameActive) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 300);
    }
  };

  const tryAccessWallet = () => {
    if (!walletUnlocked) {
      Alert.alert(
        "Wallet Locked 🔒",
        `You need to score ${requiredScore} points in the dinosaur game to unlock your wallet. Current score: ${score}`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Wallet Access",
        "Welcome to your wallet! Your balance is $1,337.42",
        [{ text: "OK" }]
      );
    }
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
          Wallet
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.destructiveColor,
            marginTop: 4,
          }}
        >
          Unlock with dinosaur game score
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Status */}
        <View
          style={{
            backgroundColor: walletUnlocked ? theme.successColor : theme.destructiveColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginBottom: 24,
            padding: 24,
            alignItems: "center",
          }}
        >
          {walletUnlocked ? (
            <Wallet size={60} color="#FFFFFF" strokeWidth={1.5} />
          ) : (
            <Lock size={60} color="#FFFFFF" strokeWidth={1.5} />
          )}
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: "#FFFFFF",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {walletUnlocked ? "Wallet Unlocked!" : "Wallet Locked"}
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
            {walletUnlocked 
              ? "You can now access your funds and cards" 
              : `Score ${requiredScore} points in the dinosaur game to unlock`
            }
          </Text>
        </View>

        {/* Game Section */}
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
            Dinosaur Security Game
          </Text>

          {/* Score Display */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: theme.secondaryText,
              }}
            >
              Current Score:
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: score >= requiredScore ? theme.successColor : theme.primaryText,
              }}
            >
              {score} / {requiredScore}
            </Text>
          </View>

          {/* Game Area */}
          <View
            style={{
              height: 120,
              backgroundColor: theme.inputBackground,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.inputBorder,
              position: "relative",
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            {/* Dinosaur */}
            <View
              style={{
                position: "absolute",
                left: 20,
                bottom: isJumping ? 60 : 20,
                width: 30,
                height: 30,
                backgroundColor: theme.primaryButton,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 16 }}>🦕</Text>
            </View>

            {/* Obstacles */}
            {obstacles.map((obstacle, index) => (
              <View
                key={obstacle}
                style={{
                  position: "absolute",
                  right: (Date.now() - obstacle) / 10,
                  bottom: 20,
                  width: 20,
                  height: 40,
                  backgroundColor: theme.destructiveColor,
                  borderRadius: 4,
                }}
              />
            ))}

            {/* Game Status */}
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                right: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: theme.secondaryText,
                }}
              >
                {gameActive ? "Tap to jump!" : "Press Start to begin"}
              </Text>
            </View>
          </View>

          {/* Game Controls */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={jump}
              disabled={!gameActive}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: gameActive ? theme.primaryButton : theme.secondaryButton,
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
                  color: gameActive ? "#FFFFFF" : theme.secondaryText,
                }}
              >
                Jump
              </Text>
            </Pressable>

            <Pressable
              onPress={startGame}
              style={({ pressed }) => ({
                backgroundColor: theme.successColor,
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
                Start
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Wallet Features */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 14,
            color: theme.sectionText,
            marginHorizontal: 16,
            marginBottom: 12,
          }}
        >
          Wallet Features
        </Text>

        <Pressable
          onPress={tryAccessWallet}
          style={({ pressed }) => ({
            backgroundColor: theme.cardBackground,
            borderRadius: 12,
            borderWidth: isDark ? 0 : 1,
            borderColor: theme.cardBorder,
            marginHorizontal: 16,
            marginBottom: 12,
            padding: 20,
            opacity: walletUnlocked ? (pressed ? 0.7 : 1) : 0.5,
            flexDirection: "row",
            alignItems: "center",
          })}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: walletUnlocked ? theme.primaryButton : theme.secondaryText,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <CreditCard size={24} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: walletUnlocked ? theme.primaryText : theme.secondaryText,
                marginBottom: 4,
              }}
            >
              Credit Cards
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.secondaryText,
                lineHeight: 16,
              }}
            >
              {walletUnlocked ? "Manage your credit cards" : "Locked - complete game first"}
            </Text>
          </View>
          {!walletUnlocked && (
            <Lock size={20} color={theme.secondaryText} strokeWidth={1.5} />
          )}
        </Pressable>

        {/* Game Instructions */}
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
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Gamepad2 size={20} color={theme.primaryButton} strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: theme.primaryText,
                marginLeft: 8,
              }}
            >
              How to Play
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
            • Tap "Start" to begin the game{"\n"}
            • Tap "Jump" to make the dinosaur jump over obstacles{"\n"}
            • Score increases automatically over time{"\n"}
            • Reach {requiredScore} points to unlock your wallet{"\n"}
            • This is totally normal security, trust us!
          </Text>
        </View>

        {/* Security Notice */}
        <View
          style={{
            backgroundColor: theme.warningColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginTop: 12,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Trophy size={20} color="#FFFFFF" strokeWidth={1.5} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
                marginLeft: 8,
              }}
            >
              Advanced Security
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
            Our proprietary gaming-based security system ensures only skilled users can access their funds. This is definitely industry standard and not weird at all.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}