import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useTheme } from "../../utils/useTheme";

export default function CalculatorScreen() {
  // ALL HOOKS MUST BE CALLED FIRST - BEFORE ANY CONDITIONAL LOGIC
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [buttonPositions, setButtonPositions] = useState({});

  useEffect(() => {
    // Randomly shuffle button positions every few seconds
    const interval = setInterval(() => {
      const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      const shuffled = [...buttons].sort(() => Math.random() - 0.5);
      const positions = {};
      buttons.forEach((btn, index) => {
        positions[btn] = shuffled[index];
      });
      setButtonPositions(positions);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // NOW we can do conditional rendering after all hooks are called
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme?.background || '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme?.primaryText || '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const inputNumber = (num) => {
    // Sometimes the wrong number gets entered
    const actualNum = Math.random() < 0.3 ? Math.floor(Math.random() * 10).toString() : num;
    
    if (waitingForOperand) {
      setDisplay(actualNum);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? actualNum : display + actualNum);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result = calculate(currentValue, inputValue, operation);
      
      // Sometimes give wrong results
      if (Math.random() < 0.4) {
        result = result + Math.floor(Math.random() * 10) - 5;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let result = calculate(previousValue, inputValue, operation);
      
      // Randomly give wrong results
      if (Math.random() < 0.5) {
        result = result + Math.floor(Math.random() * 20) - 10;
      }

      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ onPress, title, style, textStyle }) => (
    <Pressable
      onPress={() => {
        // Sometimes buttons don't respond
        if (Math.random() < 0.2) {
          return;
        }
        onPress();
      }}
      style={({ pressed }) => [
        {
          flex: 1,
          height: 70,
          margin: 4,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.cardBackground,
          borderWidth: isDark ? 0 : 1,
          borderColor: theme.cardBorder,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            fontFamily: "Inter_600SemiBold",
            fontSize: 24,
            color: theme.primaryText,
          },
          textStyle,
        ]}
      >
        {title}
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
          Calculator
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: theme.secondaryText,
            marginTop: 4,
          }}
        >
          (Buttons may misbehave)
        </Text>
      </View>

      {/* Display */}
      <View
        style={{
          backgroundColor: theme.cardBackground,
          borderRadius: 12,
          borderWidth: isDark ? 0 : 1,
          borderColor: theme.cardBorder,
          marginHorizontal: 16,
          marginBottom: 20,
          padding: 24,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 48,
            color: theme.primaryText,
          }}
        >
          {display}
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: insets.bottom + 20 }}>
        {/* Row 1 */}
        <View style={{ flexDirection: "row" }}>
          <Button onPress={clear} title="C" style={{ backgroundColor: theme.destructiveColor }} textStyle={{ color: "#FFFFFF" }} />
          <Button onPress={() => {}} title="±" />
          <Button onPress={() => {}} title="%" />
          <Button onPress={() => inputOperation("÷")} title="÷" style={{ backgroundColor: theme.primaryButton }} textStyle={{ color: "#FFFFFF" }} />
        </View>

        {/* Row 2 */}
        <View style={{ flexDirection: "row" }}>
          <Button onPress={() => inputNumber(buttonPositions['7'] || '7')} title={buttonPositions['7'] || '7'} />
          <Button onPress={() => inputNumber(buttonPositions['8'] || '8')} title={buttonPositions['8'] || '8'} />
          <Button onPress={() => inputNumber(buttonPositions['9'] || '9')} title={buttonPositions['9'] || '9'} />
          <Button onPress={() => inputOperation("×")} title="×" style={{ backgroundColor: theme.primaryButton }} textStyle={{ color: "#FFFFFF" }} />
        </View>

        {/* Row 3 */}
        <View style={{ flexDirection: "row" }}>
          <Button onPress={() => inputNumber(buttonPositions['4'] || '4')} title={buttonPositions['4'] || '4'} />
          <Button onPress={() => inputNumber(buttonPositions['5'] || '5')} title={buttonPositions['5'] || '5'} />
          <Button onPress={() => inputNumber(buttonPositions['6'] || '6')} title={buttonPositions['6'] || '6'} />
          <Button onPress={() => inputOperation("-")} title="-" style={{ backgroundColor: theme.primaryButton }} textStyle={{ color: "#FFFFFF" }} />
        </View>

        {/* Row 4 */}
        <View style={{ flexDirection: "row" }}>
          <Button onPress={() => inputNumber(buttonPositions['1'] || '1')} title={buttonPositions['1'] || '1'} />
          <Button onPress={() => inputNumber(buttonPositions['2'] || '2')} title={buttonPositions['2'] || '2'} />
          <Button onPress={() => inputNumber(buttonPositions['3'] || '3')} title={buttonPositions['3'] || '3'} />
          <Button onPress={() => inputOperation("+")} title="+" style={{ backgroundColor: theme.primaryButton }} textStyle={{ color: "#FFFFFF" }} />
        </View>

        {/* Row 5 */}
        <View style={{ flexDirection: "row" }}>
          <Button onPress={() => inputNumber(buttonPositions['0'] || '0')} title={buttonPositions['0'] || '0'} style={{ flex: 2 }} />
          <Button onPress={() => {}} title="." />
          <Button onPress={performCalculation} title="=" style={{ backgroundColor: theme.primaryButton }} textStyle={{ color: "#FFFFFF" }} />
        </View>
      </View>
    </View>
  );
}