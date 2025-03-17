import React, { useState, useEffect } from 'react';
import { CreateTournament } from '../../../wailsjs/go/entitys/TournamentManager';
import { GetExamplePlayers } from '../../../wailsjs/go/entitys/PlayerManager';
import {useNavigate} from "react-router-dom";
import { entitys } from "../../../wailsjs/go/models";
import Player = entitys.Player;

type Props = {};

const HomePage = (props: Props) => {
  const [tournamentName, setTournamentName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch example players for the search functionality
    GetExamplePlayers().then(setPlayers);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePlayerSelect = (player: Player) => {
    if (!selectedPlayers.includes(player)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleCreateTournament = () => {
    const playThirdPlace = window.confirm('¿Quieres que se juegue el tercer puesto?');
    if (window.confirm('¿Estás seguro de que quieres crear el torneo?')) {
      CreateTournament(tournamentName, playThirdPlace, selectedPlayers).then((tournament) => {
        console.log('Torneo creado:', tournament);
        navigate(`/competition/show/${tournament.id}`);
      });
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar?')) {
      setTournamentName('');
      setSelectedPlayers([]);
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white/90 items-center p-5">
      <h1 className="text-2xl font-bold mb-5">Crear Torneo</h1>
      <div className="flex justify-between w-full max-w-2xl mb-5">
        <div className="flex flex-col mr-5">
          <label className="mb-2">Nombre del Torneo:</label>
          <input
            type="text"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Buscar Jugadores:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded"
          />
          {searchTerm && (
            <ul className="mt-2 border border-gray-300 rounded max-h-40 overflow-y-auto">
              {filteredPlayers.map((player) => (
                <li
                  key={player.id}
                  onClick={() => handlePlayerSelect(player)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full max-w-2xl mb-5">
        <h2 className="text-xl font-semibold mb-2">Jugadores Seleccionados</h2>
        <ul className="border border-gray-300 rounded p-2">
          {selectedPlayers.map((player) => (
            <li key={player.id} className="p-2">
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between w-full max-w-2xl">
        <button
          onClick={handleCreateTournament}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Torneo
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default HomePage;