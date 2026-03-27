import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CreateHuntScreen from './src/screens/CreateHuntScreen';
import HuntDetailScreen from './src/screens/HuntDetailScreen';
import HuntListScreen from './src/screens/HuntListScreen';
import QrScanScreen from './src/screens/QrScanScreen';
import { Hunt } from './src/services/api';

type Screen = 'list' | 'detail' | 'scan' | 'create';

export default function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const [selectedHunt, setSelectedHunt] = useState<Hunt | null>(null);

  const handleSelectHunt = (hunt: Hunt) => {
    setSelectedHunt(hunt);
    setScreen('detail');
  };

  const handleHuntCreated = (hunt: Hunt) => {
    setSelectedHunt(hunt);
    setScreen('detail');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screen === 'list' && (
        <HuntListScreen
          onSelectHunt={handleSelectHunt}
          onCreateHunt={() => setScreen('create')}
        />
      )}
      {screen === 'create' && (
        <CreateHuntScreen
          onBack={() => setScreen('list')}
          onCreated={handleHuntCreated}
        />
      )}
      {screen === 'detail' && selectedHunt && (
        <HuntDetailScreen
          hunt={selectedHunt}
          onBack={() => setScreen('list')}
          onScanQr={() => setScreen('scan')}
        />
      )}
      {screen === 'scan' && (
        <QrScanScreen onBack={() => setScreen(selectedHunt ? 'detail' : 'list')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

