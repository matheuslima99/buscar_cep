import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {api} from './src/services/api';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [data, setData] = useState(null);
  const inputRef = useRef(null)

  const getZipCode = async () => {
    try {
      if (zipCode.trim().length != 8) {
        alert('Digite um cep válido');
      }
      const response = await api.get(`${zipCode}/json/`);
      setData(response.data);
      setZipCode('');
      Keyboard.dismiss();
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  };

  const ClearInput = () => {
    setZipCode('');
    inputRef.current.focus();
    setData(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputArea}>
        <Text style={styles.title}>Digite o cep desejado</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 58065147"
          value={zipCode}
          onChangeText={text => setZipCode(text)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#00f'}]}
          onPress={getZipCode}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#f00'}]}
          onPress={ClearInput}>
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {data && (
        <View style={styles.resultArea}>
          <Text style={styles.textResult}> CEP: {data.cep} </Text>
          <Text style={styles.textResult}> Lodradouro: {data.logradouro} </Text>
          <Text style={styles.textResult}> Bairro: {data.bairro} </Text>
          <Text style={styles.textResult}> Cidade: {data.localidade} </Text>
          <Text style={styles.textResult}> Estado: {data.uf} </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    backgroundColor: '#ccc',
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
  },
  btnArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
  resultArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResult: {
    fontSize: 20,
    color: '#000',
  },
});

export default App;
