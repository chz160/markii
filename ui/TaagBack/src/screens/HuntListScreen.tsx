import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Hunt, huntsApi } from '../services/api';

interface Props {
  onSelectHunt: (hunt: Hunt) => void;
  onCreateHunt: () => void;
}

export default function HuntListScreen({ onSelectHunt, onCreateHunt }: Props) {
  const [hunts, setHunts] = useState<Hunt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    huntsApi
      .getAll()
      .then(setHunts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Scavenger Hunts</Text>
      <FlatList
        data={hunts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelectHunt(item)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.description ? (
              <Text style={styles.cardDescription}>{item.description}</Text>
            ) : null}
            <Text style={styles.cardMeta}>{item.stops.length} stops</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hunts yet. Create one!</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={onCreateHunt}>
        <Text style={styles.fabText}>+ New Hunt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', margin: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardDescription: { color: '#666', marginTop: 4 },
  cardMeta: { color: '#999', marginTop: 6, fontSize: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
  error: { color: 'red' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2196F3',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4,
  },
  fabText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
