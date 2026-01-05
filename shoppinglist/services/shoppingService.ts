import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ShoppingItem } from "../models/shoppingitem";

// ADD
export const addItem = async (name: string) => {
  await addDoc(collection(db, "shoppingList"), {
    name,
    purchased: false,
  });
};

// GET
export const getItems = async (): Promise<ShoppingItem[]> => {
  const snapshot = await getDocs(collection(db, "shoppingList"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ShoppingItem[];
};

// DELETE
export const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, "shoppingList", id));
};

// UPDATE
export const togglePurchased = async (id: string, value: boolean) => {
  await updateDoc(doc(db, "shoppingList", id), {
    purchased: value,
  });
};
