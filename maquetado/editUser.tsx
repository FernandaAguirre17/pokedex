import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  SafeAreaView, ScrollView, Alert, ActivityIndicator, StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const InputField = ({ label, icon, value, onChangeText, placeholder }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <Feather name={icon} size={20} color="#aaa" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCapitalize="none"
      />
    </View>
  </View>
);

const EditProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    if (!userData.name.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    if (!userData.email.includes('@')) {
      Alert.alert('Error', 'Correo electrónico inválido');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        'Perfil Actualizado',
        'Los cambios se han guardado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity
          style={[styles.saveButton, isSaving && { opacity: 0.6 }]}
          onPress={handleSaveProfile}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Guardar</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <InputField
          label="Nombre completo"
          icon="user"
          value={userData.name}
          onChangeText={(val) => handleChange('name', val)}
          placeholder="Tu nombre completo"          
        />
        <InputField
          label="Nombre de usuario"
          icon="at-sign"
          value={userData.username}
          onChangeText={(val) => handleChange('username', val)}
          placeholder="Nombre de usuario"
        />
        <InputField
          label="Correo electrónico"
          icon="mail"
          value={userData.email}
          onChangeText={(val) => handleChange('email', val)}
          placeholder="correo@ejemplo.com"          
        />
        <InputField
          label="Teléfono"
          icon="phone"
          value={userData.phone}
          onChangeText={(val) => handleChange('phone', val)}
          placeholder="Tu número de teléfono"          
        />
        <InputField
          label="Ubicación"
          icon="map-pin"
          value={userData.location}
          onChangeText={(val) => handleChange('location', val)}
          placeholder="Ciudad, País"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
    },
  scroll: { 
    padding: 16, 
    paddingBottom: 40 
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333' 
    },
  saveButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 14 
    },
  inputGroup: { 
    marginBottom: 16 
    },
  label: { 
    fontSize: 14, 
    fontWeight: '500', 
    color: '#555', 
    marginBottom: 6 
    },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    elevation: 1,
  },
  inputIcon: { 
    marginRight: 10 
    },
  input: { 
    flex: 1, 
    paddingVertical: 14, 
    fontSize: 15, 
    color: '#333' 
    },
});

export default EditProfileScreen;
