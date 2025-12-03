import React, { useState } from "react"
import { View, TextInput, Button, StyleSheet } from "react-native"

interface Props {
    onAdd: (title: string) => void
}

export default function AddTodo({ onAdd }: Props) {
    const [text, setText] = useState("")


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new task..."
                value={text}
                onChangeText={setText}
                />
                <Button
                    title="Add"
                    onPress={() => {
                        if (text.trim().length > 0) {
                            onAdd(text)
                            setText("")
                        }
                    }}
                    />
                    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
});