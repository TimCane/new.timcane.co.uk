import { useEffect, useState } from "react";
import LoadingSplash from "./components/common/loading-splash";
import { WizardProvider } from "./components/wizard/context/wizard-context";
import GameSetupWizard from "./components/wizard/GameSetupWizard";
import type { GameSetupData } from "./components/wizard/types";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleGameSetup = (data: GameSetupData) => {
    console.log('Game setup complete:', data);
  };

  if (isLoading) {
    return <LoadingSplash />;
  }

  return (
    <div className="App">
      <WizardProvider>
        <GameSetupWizard onComplete={handleGameSetup} />
      </WizardProvider>
    </div>
  );
}

export default App;