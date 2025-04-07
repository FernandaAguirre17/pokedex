import React, { useState, useRef } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Animated, Dimensions, StatusBar, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PasswordRecoveryScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateToStep = (nextStep) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -width * (nextStep - 1), duration: 0, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const validateAndContinue = (validator, nextStep) => {
    if (!validator()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
      animateToStep(nextStep);
    }, 1500);
  };

  const renderInput = (icon, placeholder, value, setValue, options = {}) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={22} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={setValue}
        {...options}
      />
    </View>
  );

  const renderButton = (text, onPress, loadingCondition) => (
    <TouchableOpacity
      style={[styles.button, loadingCondition ? styles.buttonDisabled : null]}
      onPress={onPress}
      disabled={loadingCondition}
    >
      <Text style={styles.buttonText}>
        {loadingCondition ? 'Cargando...' : text}
      </Text>
    </TouchableOpacity>
  );

  const renderStepContent = () => (
    <Animated.View style={[styles.stepsContainer, { transform: [{ translateX: slideAnim }], opacity: fadeAnim }]}>
      {/* Paso 1 */}
      <View style={styles.step}>
        <Text style={styles.title}>Recupera tu cuenta</Text>
        <Text style={styles.subtitle}>Ingresa tu correo electrónico</Text>
        {renderInput("mail-outline", "Correo electrónico", email, setEmail, { keyboardType: 'email-address', autoCapitalize: 'none' })}
        {renderButton("Continuar", () => validateAndContinue(() => {
          if (!email.includes('@')) {
            Alert.alert('Error', 'Correo inválido');
            return false;
          }
          return true;
        }, 2), isLoading && step === 1)}
      </View>

      {/* Paso 2 */}
      <View style={styles.step}>
        <Text style={styles.title}>Código de verificación</Text>
        {renderInput("key-outline", "Código", verificationCode, setVerificationCode, { keyboardType: 'numeric' })}
        {renderButton("Verificar", () => validateAndContinue(() => {
          if (verificationCode.length < 4) {
            Alert.alert('Error', 'Código inválido');
            return false;
          }
          return true;
        }, 3), isLoading && step === 2)}
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>¿No recibiste el código? Reenviar</Text>
        </TouchableOpacity>
      </View>

      {/* Paso 3 */}
      <View style={styles.step}>
        <Text style={styles.title}>Nueva contraseña</Text>
        {renderInput("lock-closed-outline", "Nueva contraseña", newPassword, setNewPassword, { secureTextEntry: true })}
        {renderInput("lock-closed-outline", "Confirmar contraseña", confirmPassword, setConfirmPassword, { secureTextEntry: true })}
        {renderButton("Actualizar contraseña", () => {
          if (newPassword.length < 6) {
            Alert.alert('Error', 'Mínimo 6 caracteres');
            return;
          }
          if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
          }

          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            Alert.alert('¡Listo!', 'Contraseña actualizada.', [
              { text: 'Iniciar sesión', onPress: () => navigation.navigate('Login') }
            ]);
          }, 1500);
        }, isLoading && step === 3)}
      </View>
    </Animated.View>
  );

  const goBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
      Animated.timing(slideAnim, {
        toValue: -width * (step - 2),
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity style={styles.backButton} onPress={goBackStep}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(step / 3) * 100}%` }]} />
        </View>
        {renderStepContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
    },
  scrollContent: { 
    flexGrow: 1, 
    paddingHorizontal: 20, 
    paddingBottom: 40 
    },
  backButton: { 
    padding: 12, 
    marginLeft: 8 
    },
  progressContainer: {
    height: 4, 
    backgroundColor: '#eee', 
    borderRadius: 2, 
    marginVertical: 20, 
    overflow: 'hidden',
  },
  progressBar: { 
    height: '100%', 
    backgroundColor: '#4f46e5' 
    },
  stepsContainer: { 
    width: width * 3, 
    flexDirection: 'row' 

  },
  step: { 
    width: width - 40, 
    marginRight: 40 

  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 12 

  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 30 

  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#ddd', 
    borderRadius: 12, 
    marginBottom: 20, 
    backgroundColor: '#f9f9f9',
  },
  inputIcon: { 
    paddingHorizontal: 12 
    },
  input: { 
    flex: 1, 
    paddingVertical: 15, 
    paddingRight: 12, 
    fontSize: 16, 
    color: '#333' 
    },
  button: {
    backgroundColor: '#4f46e5', 
    borderRadius: 12,
    paddingVertical: 16, 
    alignItems: 'center', 
    marginTop: 10,
  },
  buttonDisabled: { 
    opacity: 0.7 
},
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
},
  linkButton: { 
    alignItems: 'center', 
    marginTop: 20, 
    padding: 8 
},
  linkText: { 
    color: '#4f46e5', 
    fontSize: 16 
},
});

export default PasswordRecoveryScreen;
