import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  // useReducer-based state and actions from the custom hook
  const { todos, addTodo, toggleTodo } = useTodos();

  return (
    <View style={styles.container}>
      <AddTodo onAdd={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={toggleTodo} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
});
