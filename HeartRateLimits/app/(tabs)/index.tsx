import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";

export default function Index() {
  const [age, setAge] = useState("");
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(0);

  const calculate = (text: string) => {
    setAge(text);

    const numericAge = parseInt(text);
    if (isNaN(numericAge)) {
      setLower(0);
      setUpper(0);
      return;
    }

    const lowerLimit = (220 - numericAge) * 0.65;
    const upperLimit = (220 - numericAge) * 0.85;

    setLower(Number(lowerLimit.toFixed(0)));
    setUpper(Number(upperLimit.toFixed(0)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Heart Rate Limits</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Your Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={calculate}
          keyboardType="numeric"
          placeholder="age..."
        />
      </View>

      <View style={styles.results}>
        <Text style={styles.resultText}>Lower Limit: {lower} - bpm</Text>
        <Text style={styles.resultText}>Upper Limit: {upper} - bpm</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 18,
    width: 100,
    textAlign: "center",
    backgroundColor: "white",
  },
  results: {
    alignItems: "center",
  },
  resultText: {
    fontSize: 20,
    marginVertical: 5,
  },
});
