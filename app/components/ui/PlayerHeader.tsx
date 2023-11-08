import React from 'react'

const PlayerHeader = ({selectedPlayer}) => {
  return (
    <div className="player-header-container">
        <h3 className="player-name">{selectedPlayer["First Name"]} {selectedPlayer["Last Name"]}</h3>
        <h5 className="player-id">Player ID: {selectedPlayer.player_id}</h5>
    </div>
  )
}

export default PlayerHeader