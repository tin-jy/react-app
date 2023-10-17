import Alert from "./components/Alert";
import GameButton from "./components/GameButton";
import ControlButton from "./components/ControlButton";
import Card from "./components/Card";
import { update, start, score, trials, tracker } from "./logic/model";

import { useState } from "react";
import VisualDisplay from "./components/Visual Display";

function App() {
  const [gameState, setGameState] = useState(false);
  const [alertState, setAlertState] = useState(-1);
  const [refresher, setRefresher] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const StartButton = (
    <ControlButton
      color="secondary"
      onClick={() => {
        start();
        setGameState(true);
      }}
    >
      Start
    </ControlButton>
  );

  const EndButton = (
    <ControlButton
      color="secondary"
      onClick={() => {
        start();
        setGameState(false);
        setAlertState(-1);
      }}
    >
      End
    </ControlButton>
  );

  // useEffect(() => {
  //   document.addEventListener("keyup", detectKeyDown, true);
  //   return () => {
  //     document.removeEventListener("keyup", detectKeyDown, true);
  //   };
  // }, []);

  // const detectKeyDown = (e: KeyboardEvent) => {
  //   if (gameState) {
  //     if (e.key == "ArrowLeft") {
  //       handleClick(0);
  //     }
  //     if (e.key == "ArrowRight") {
  //       handleClick(1);
  //     }
  //   }
  // };

  function handleClick(data: number): void {
    const outcome = update(data);
    outcome ? setAlertState(1) : setAlertState(0);
    setRefresher(!refresher);
  }

  const GameButtons = gameState ? (
    <div>
      <GameButton
        onClick={() => {
          handleClick(0);
        }}
      >
        Left
      </GameButton>
      <GameButton
        onClick={() => {
          handleClick(1);
        }}
      >
        Right
      </GameButton>
    </div>
  ) : null;

  const SuccessAlert = <Alert type="success">+1</Alert>;
  const DangerAlert = <Alert type="danger">0</Alert>;
  const DisplayAlert =
    alertState === 0 ? SuccessAlert : alertState === 1 ? DangerAlert : null;

  const scoreCalculator = (s: number, t: number) => {
    const output = t === 0 ? 0 : Math.round((s / t) * 10000) / 100;
    if (t > 50 && output > highScore) {
      setHighScore(output);
    }
    return output;
  };

  const ScoreAlert = (
    <Alert type="primary">
      Times you fooled the Machine: {score} out of {trials} (
      {scoreCalculator(score, trials)}%)
    </Alert>
  );

  return (
    <div>
      {gameState ? EndButton : StartButton}
      {GameButtons}
      {DisplayAlert}
      {ScoreAlert}
      <VisualDisplay predictions={tracker}></VisualDisplay>
      <Card>High score: {highScore}</Card>
      {refresher ? null : null}
    </div>
  );
}

export default App;
