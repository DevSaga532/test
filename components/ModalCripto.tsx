

import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CryptoData } from '@/types/types';

const ModalCripto = () => {
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
      const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
             <View style={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
               {selectedCrypto && (
                 <>
                   <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedCrypto.symbol}</Text>
                   <Text>Precio: ${selectedCrypto.price}</Text>
                   <Text>Cambio: {selectedCrypto.change}%</Text>
                   <Text>Volumen: {selectedCrypto.volume}</Text>
                   <Text>Capitalización de Mercado: ${selectedCrypto.marketCap}</Text>
                   <Button title="Comprar" onPress={() => console.log('Comprar', selectedCrypto.symbol)} />
                   <Button title="Vender" onPress={() => console.log('Vender', selectedCrypto.symbol)} />
                   <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                 </>
               )}
             </View>
           </View>
  )
}

export default ModalCripto

const styles = StyleSheet.create({})