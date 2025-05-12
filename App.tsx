import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Todo from './Todo';

// 2124802010151 - Lê Sỹ Hoài

export default function App() {
  const [todo, setTodo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<{ id: string; title: string; complete: boolean }[]>([]);
  const ref = firestore().collection('todos');

  const addTodo = async () => {
    if (todo.trim().length === 0) return;
    await ref.add({ title: todo, complete: false });
    setTodo('');
  };

  useEffect(() => {
    return ref.onSnapshot(snapshot => {
      const list: typeof todos = [];
      snapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({ id: doc.id, title, complete });
      });
      setTodos(list);
      if (loading) setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <Text style={styles.title}>📝 TodosApp</Text>

        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Todo {...item} />}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add a new task..."
            value={todo}
            onChangeText={setTodo}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={addTodo} style={styles.button}>
            <Text style={styles.buttonText}>➕</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 16,
    color: '#333',
  },
  list: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
