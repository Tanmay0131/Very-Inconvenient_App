import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StatusBar, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { MessageSquare, Send, Coins, RotateCcw } from "lucide-react-native";
import { useTheme } from "../../utils/useTheme";

export default function MessagesScreen() {
  // ALL HOOKS MUST BE CALLED FIRST
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's it going?", sender: "friend", time: "2:30 PM" },
    { id: 2, text: "Good! Just testing this new messaging app", sender: "me", time: "2:31 PM" },
    { id: 3, text: "Oh cool, what makes it special?", sender: "friend", time: "2:32 PM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [canSend, setCanSend] = useState(false);
  const [lastFlip, setLastFlip] = useState(null);
  const [consecutiveWins, setConsecutiveWins] = useState(0);

  // NOW conditional rendering after all hooks
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const flipCoin = () => {
    // The coin flip is rigged - starts easy but gets harder
    let chanceToWin;
    if (consecutiveWins < 2) {
      chanceToWin = 0.8; // 80% chance to win first couple times
    } else if (consecutiveWins < 5) {
      chanceToWin = 0.4; // 40% chance after that
    } else {
      chanceToWin = 0.1; // 10% chance after 5 wins
    }

    const userWins = Math.random() < chanceToWin;
    const flipResult = userWins ? "heads" : "tails";
    
    setLastFlip(flipResult);
    
    if (userWins) {
      setCanSend(true);
      setConsecutiveWins(prev => prev + 1);
      Alert.alert(
        "You Win! 🎉",
        `Coin landed on ${flipResult}! You can send your message.`,
        [{ text: "OK" }]
      );
    } else {
      setCanSend(false);
      setConsecutiveWins(0);
      Alert.alert(
        "You Lose! 😔",
        `Coin landed on ${flipResult}. Your friend gets to send the next message instead.`,
        [{ text: "OK" }]
      );
      
      // Add a message from friend
      setTimeout(() => {
        const friendMessages = [
          "Haha, I get to send a message now!",
          "This coin flip system is totally fair 😏",
          "Better luck next time!",
          "The coin has spoken!",
          "Maybe try flipping again?",
          "This messaging app is wild!",
          "I'm loving this random messaging system"
        ];
        const randomMessage = friendMessages[Math.floor(Math.random() * friendMessages.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: randomMessage,
          sender: "friend",
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  };

  const sendMessage = () => {
    if (!canSend || !newMessage.trim()) {
      Alert.alert(
        "Cannot Send Message",
        "You need to win a coin flip first to send a message!",
        [{ text: "OK" }]
      );
      return;
    }

    const newMsg = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    setCanSend(false); // Reset permission after sending
  };

  const resetGame = () => {
    setCanSend(false);
    setLastFlip(null);
    setConsecutiveWins(0);
    setNewMessage("");
  };

  const Message = ({ message }) => (
    <View
      style={{
        alignSelf: message.sender === "me" ? "flex-end" : "flex-start",
        backgroundColor: message.sender === "me" ? theme.primaryButton : theme.cardBackground,
        borderRadius: 12,
        borderWidth: message.sender === "me" ? 0 : (isDark ? 0 : 1),
        borderColor: theme.cardBorder,
        padding: 12,
        marginVertical: 4,
        marginHorizontal: 16,
        maxWidth: "80%",
      }}
    >
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: message.sender === "me" ? "#FFFFFF" : theme.primaryText,
          lineHeight: 18,
        }}
      >
        {message.text}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 10,
          color: message.sender === "me" ? "rgba(255,255,255,0.7)" : theme.secondaryText,
          marginTop: 4,
          alignSelf: "flex-end",
        }}
      >
        {message.time}
      </Text>
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
          Messages
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.destructiveColor,
            marginTop: 4,
          }}
        >
          Coin flip decides who sends next message
        </Text>
      </View>

      {/* Coin Flip Status */}
      <View
        style={{
          backgroundColor: theme.cardBackground,
          borderBottomWidth: 1,
          borderBottomColor: theme.dividerColor,
          padding: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: theme.primaryText,
                marginBottom: 4,
              }}
            >
              Messaging Permission: {canSend ? "✅ Granted" : "❌ Denied"}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: theme.secondaryText,
              }}
            >
              Consecutive wins: {consecutiveWins} • Last flip: {lastFlip || "None"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={flipCoin}
              style={({ pressed }) => ({
                backgroundColor: theme.warningColor,
                borderRadius: 8,
                padding: 10,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Coins size={16} color="#FFFFFF" strokeWidth={1.5} />
            </Pressable>

            <Pressable
              onPress={resetGame}
              style={({ pressed }) => ({
                backgroundColor: theme.secondaryButton,
                borderRadius: 8,
                padding: 10,
                alignItems: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <RotateCcw size={16} color={theme.primaryText} strokeWidth={1.5} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ScrollView>

      {/* Message Input */}
      <View
        style={{
          backgroundColor: theme.cardBackground,
          borderTopWidth: 1,
          borderTopColor: theme.dividerColor,
          padding: 16,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: theme.inputBackground,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: theme.inputBorder,
              paddingHorizontal: 16,
              paddingVertical: 8,
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: theme.primaryText,
              opacity: canSend ? 1 : 0.5,
            }}
            placeholder={canSend ? "Type a message..." : "Win coin flip to send message"}
            placeholderTextColor={theme.placeholderText}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            editable={canSend}
          />

          <Pressable
            onPress={canSend ? sendMessage : flipCoin}
            style={({ pressed }) => ({
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: canSend ? theme.primaryButton : theme.warningColor,
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            {canSend ? (
              <Send size={16} color="#FFFFFF" strokeWidth={1.5} />
            ) : (
              <Coins size={16} color="#FFFFFF" strokeWidth={1.5} />
            )}
          </Pressable>
        </View>

        {/* Instructions */}
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 11,
            color: theme.secondaryText,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {canSend 
            ? "You can send a message! Type and tap send." 
            : "Tap the coin to flip for messaging permission. (Gets harder after each win!)"
          }
        </Text>
      </View>
    </View>
  );
}