import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface TodoProps {
  id: string;
  title: string;
  complete: boolean;
}

// 2124802010151 - Lê Sỹ Hoài

export default function Todo({ id, title, complete }: TodoProps) {
  const toggleComplete = async () => {
    await firestore().collection('todos').doc(id).update({ complete: !complete });
  };

  const deleteTodo = async () => {
    await firestore().collection('todos').doc(id).delete();
  };

  return (
    <TouchableOpacity
      onPress={toggleComplete}
      onLongPress={deleteTodo}
      style={[
        styles.item,
        complete && styles.itemDone,
      ]}
    >
      <Text style={[styles.text, complete && styles.textDone]}>
        {title}
      </Text>
      <Text style={styles.status}>{complete ? '✅' : '⬜'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemDone: {
    backgroundColor: '#e0ffe0',
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  status: {
    fontSize: 18,
    marginLeft: 8,
  },
});
