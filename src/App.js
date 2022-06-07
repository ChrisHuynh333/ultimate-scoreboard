import React, {useEffect} from 'react'
import Score from './Score'
import GameStartModal from './GameStartModal'

function App() {
  return (
    <div>
      <GameStartModal />
      <Score />
    </div>
  );
}

export default App;
