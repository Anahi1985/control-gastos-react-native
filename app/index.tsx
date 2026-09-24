
import { usePostGasto } from '@/hooks/usePostGasto';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { postGasto, loading, error } = usePostGasto();
  
  const [lugar, setLugar] = useState('');
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  const handleEnviar = async () => {
    if (!lugar || !categoria || !monto || !fecha) {
      Alert.alert('Atención', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await postGasto({
        lugar,
        categoria,
        monto: parseFloat(monto),
        fecha,
      });
      
      Alert.alert('¡Éxito!', 'El gasto se guardó correctamente en el servidor.');
      
      setLugar('');
      setCategoria('');
      setMonto('');
      setFecha(new Date().toISOString().split('T')[0]);
    } catch (err) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Gastos (POST)</Text>

      <TextInput
        style={styles.input}
        placeholder="Lugar (ej. Supermercado)"
        placeholderTextColor="#8712ab"
        value={lugar}
        onChangeText={setLugar}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoría (ej. Comida)"
        placeholderTextColor="#8712ab"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        placeholderTextColor="#8712ab"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (Ej: 2026-09-24)"
        placeholderTextColor="#8712ab"
        value={fecha}
        onChangeText={setFecha}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrar Gasto</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#c7bbcb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4c1471',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#8712ab'

  },
  button: {
    backgroundColor: '#4c1471',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});
