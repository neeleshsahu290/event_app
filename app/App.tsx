import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useEffect } from "react";
import { initDatabase } from "./bridge/storage/database";
import RootNavigation from "./core/navigation/RootNavigation";

export default function App() {
useEffect(() => {
    initDatabase();
    
  
   
  }, []);


  return (
  
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <RootNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
 
  );
}
