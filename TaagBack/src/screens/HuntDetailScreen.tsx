import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Hunt, HuntStop, stopsApi } from '../services/api';

interface Props {
  hunt: Hunt;
  onBack: () => void;
  onScanQr: () => void;
}

export default function HuntDetailScreen({ hunt, onBack, onScanQr }: Props) {
  const [stops, setStops] = useState<HuntStop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stopsApi
      .getAll(hunt.id)
      .then(setStops)
      .finally(() => setLoading(false));
  }, [hunt.id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{hunt.name}</Text>
      {hunt.description ? (
        <Text style={styles.description}>{hunt.description}</Text>
      ) : null}

      <Text style={styles.sectionHeading}>Stops</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={stops}
          keyExtractor={(s) => s.id}
          renderItem={({ item }) => (
            <View style={styles.stopCard}>
              <Text style={styles.stopOrder}>Stop {item.order}</Text>
              <Text style={styles.stopTitle}>{item.title}</Text>
              {item.clue ? <Text style={styles.clue}>Clue: {item.clue}</Text> : null}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No stops yet.</Text>}
        />
      )}

      <TouchableOpacity style={styles.scanBtn} onPress={onScanQr}>
        <Text style={styles.scanBtnText}>📷 Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: '#2196F3', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  description: { color: '#555', marginBottom: 16 },
  sectionHeading: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  stopCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  stopOrder: { fontSize: 11, color: '#999', textTransform: 'uppercase' },
  stopTitle: { fontSize: 16, fontWeight: '600', marginTop: 2 },
  clue: { color: '#555', marginTop: 4 },
  empty: { color: '#999', textAlign: 'center', marginTop: 24 },
  scanBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  scanBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
