import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { Todo } from "../types/Todo";

interface Props {
  item: Todo;
  onToggle: (id: string) => void;
}

export default function TodoItem({ item, onToggle }: Props) {
  return (
    <Pressable onPress={() => onToggle(item.id)}>
      <View style={styles.row}>
        <Text style={[styles.text, item.done && styles.done]}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 18,
  },
  done: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
