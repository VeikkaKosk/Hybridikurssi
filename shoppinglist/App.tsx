import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import {
  addItem,
  getItems,
  deleteItem,
  togglePurchased
} from "./services/shoppingService";

import { ShoppingItem } from "./models/shoppingitem";

export default function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [text, setText] = useState("");

  const loadItems = async () => {
    setItems(await getItems());
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addItem(text);
    setText("");
    loadItems();
  };

  const handleToggle = async (item: ShoppingItem) => {
    await togglePurchased(item.id!, !item.purchased);
    loadItems();
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add item"
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id!}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => handleToggle(item)}>
              <Text
                style={[
                  styles.itemText,
                  item.purchased && styles.purchased
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>

            <Button
              title="Delete"
              color="red"
              onPress={() => handleDelete(item.id!)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    padding: 8
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5
  },
  itemText: {
    fontSize: 18
  },
  purchased: {
    textDecorationLine: "line-through",
    color: "gray"
  }
});
