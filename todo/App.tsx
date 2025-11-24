import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import { Todo } from "./types/Todo";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const STORAGE_KEY = "@todos";

  // Load saved tasks
  useEffect(() => {
    const loadTodos = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setTodos(JSON.parse(saved));
    };
    loadTodos();
  }, []);

  // Save tasks whenever changed
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      title,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: !t.done } 
          : t
      )
    );
  };

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
