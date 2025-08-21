import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const mockFavorites = [
  { id: '1', number: 'Art. 1o', text: 'Toda pessoa é capaz de direitos e deveres na ordem civil.' },
  { id: '5', number: 'Art. 5o', text: 'A menoridade cessa aos dezoito anos completos, quando a pessoa fica habilitada à prática de todos os atos da vida civil.' },
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('anotacoes');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const router = useRouter();

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, { id: Date.now().toString(), text: newNote }]);
      setNewNote('');
    }
  };

  const renderContent = () => {
    if (selectedTab === 'anotacoes') {
      return (
        <View style={styles.contentContainer}>
          <TextInput
            style={styles.noteInput}
            placeholder="Escreva sua anotação..."
            value={newNote}
            onChangeText={setNewNote}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
            <Text style={styles.addButtonText}>Adicionar Anotação</Text>
          </TouchableOpacity>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text style={styles.noteText}>{item.text}</Text>}
            ListHeaderComponent={<Text style={styles.header}>Anotações</Text>}
          />
        </View>
      );
    }
    if (selectedTab === 'favoritos') {
      return (
        <View style={styles.contentContainer}>
          <FlatList
            data={mockFavorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.articleContainer}>
                <Text style={styles.title}>{item.number}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            )}
            ListHeaderComponent={<Text style={styles.header}>Favoritos</Text>}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => router.push('/codigocivil')}
      >
        <Text style={styles.navigationButtonText}>Acessar o Código Civil</Text>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'anotacoes' && styles.selectedTab]}
          onPress={() => setSelectedTab('anotacoes')}
        >
          <Text style={styles.tabButtonText}>Anotações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'favoritos' && styles.selectedTab]}
          onPress={() => setSelectedTab('favoritos')}
        >
          <Text style={styles.tabButtonText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  navigationButton: {
    backgroundColor: '#36454F',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: '#b89a2d',
  },
  tabButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  noteInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#36454F',
  },
  noteText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#36454F',
  },
  articleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#36454F',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#36454F',
  },
});