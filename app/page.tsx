'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import SortableTable from './components/base/SortableTable'
import SearchInput from './components/base/SearchInput'
import PlayerHeader from './components/ui/PlayerHeader'
import { BreakPlot } from './components/charts/BreakPlot/breakPlot'

export default function Home() {
  const [players, setPlayers] = useState<any[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState({
    "First Name": "Josiah",
    "Last Name": "Gray",
    "player_id": 680686
  })
  const [searchInput, setSearchInput] = useState('');
  const [PitchTypeData, setPitchTypeData] = useState([]);
  const [PitchGameData, setPitchGameData] = useState<any[]>([]);
  const playerTableHeaders: string[] = ["First Name", "Last Name"];
  const pitchTableHeaders: string[] = ["Pitch Type", "Pitches Thrown", "Usage", "Avg Speed", "Avg HB", "Avg VB", "Avg Spin Rate", "Avg Exit Speed", "Avg Launch Angle"]

  const uniquePitchTypes = Array.from(new Set(PitchGameData.flatMap(item => item.pitchTypeUsage.map((pt: any) => pt.pitchType))));
  const gameTableHeaders: string[] = ["Game Date", "Pitches Thrown", "Avg Fastball Velo", ...uniquePitchTypes]

  useEffect(() => {
    fetch("http://localhost:3000/api/players", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pitchTypes/${selectedPlayer.player_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPitchTypeData(data));

    fetch(`http://localhost:3000/api/pitchGameData/${selectedPlayer.player_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const gameData = data.map((item: any) => {
          const usageData = {};
          item.pitchTypeUsage.forEach(pt => {
            usageData[pt.pitchType] = pt.usage
          })
          return {
            ...item,
            ...usageData
          }
        })
        setPitchGameData(gameData)
      })
  }, [selectedPlayer])

  const handleSelectPlayer = (rowData: any) => {
    setSelectedPlayer(rowData)
  }

  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value)
  }

  const playerSearch = () => {
    fetch(`http://localhost:3000/api/players/${searchInput}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPlayers(data));
    
  }


  return (
    <div>
      <h2 className="page-heading">MLB</h2>
      <h3 className="page-subheading">Pitching Stats</h3>
      <div className="page-container">
        <div>
          <div className='search-container'>
          <SearchInput name={'Player Search'} inputValue={searchInput} onChange={handleSearchInputChange} />
          <button disabled={!searchInput} className='submit-button' type='button' onClick={playerSearch}>Search</button>
        </div>
        <div>
        <SortableTable columns={playerTableHeaders} data={players} onRowClick={handleSelectPlayer} />
        <BreakPlot width={400} height={400} data={PitchTypeData}/>
        </div>
        </div>
        <div>
          <div className="top-page-container">
          <PlayerHeader selectedPlayer={selectedPlayer} />
          </div>
          <SortableTable columns={pitchTableHeaders} data={PitchTypeData}/>
          <SortableTable columns={gameTableHeaders} data={PitchGameData}/>
        </div>
      </div>
    </div>
  )
}
