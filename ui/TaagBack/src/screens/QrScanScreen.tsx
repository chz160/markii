import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { scanApi, HuntStop } from '../services/api';

interface Props {
  onBack: () => void;
}

export default function QrScanScreen({ onBack }: Props) {
  const [token, setToken] = useState('');
  const [stop, setStop] = useState<HuntStop | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!token.trim()) return;
    setLoading(true);
    setError(null);
    setStop(null);
    try {
      const result = await scanApi.scan(token.trim());
      setStop(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to scan QR code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Scan QR Code</Text>
      <Text style={styles.subtitle}>
        Point your camera at a QR code to reveal the next clue.
      </Text>

      {/* Placeholder for camera integration (expo-camera) */}
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.cameraText}>📷 Camera preview (add expo-camera)</Text>
      </View>

      <Text style={styles.orLabel}>— or enter token manually —</Text>

      <TextInput
        style={styles.input}
        placeholder="QR token"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleScan} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Lookup</Text>}
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {stop ? (
        <View style={styles.result}>
          <Text style={styles.resultStop}>Stop {stop.order}</Text>
          <Text style={styles.resultTitle}>{stop.title}</Text>
          {stop.clue ? <Text style={styles.resultClue}>{stop.clue}</Text> : null}
          {stop.hint ? <Text style={styles.resultHint}>Hint: {stop.hint}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: '#2196F3', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { color: '#555', marginBottom: 16 },
  cameraPlaceholder: {
    height: 220,
    backgroundColor: '#222',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cameraText: { color: '#aaa', fontSize: 14 },
  orLabel: { textAlign: 'center', color: '#999', marginBottom: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  error: { color: 'red', marginTop: 12, textAlign: 'center' },
  result: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    elevation: 2,
  },
  resultStop: { fontSize: 11, color: '#999', textTransform: 'uppercase' },
  resultTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  resultClue: { color: '#333', marginTop: 8 },
  resultHint: { color: '#888', marginTop: 6, fontStyle: 'italic' },
});
