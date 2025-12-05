import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setBarcodeData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (!hasPermission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {barcodeData && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Scanned EAN: {barcodeData}</Text>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  resultBox: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 16,
    alignItems: "center",
  },
  resultText: { fontSize: 18, color: "#fff" },
});
