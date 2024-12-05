import React, { useState, useEffect } from 'react';
import { CreatePlayer } from '../../../wailsjs/go/entitys/PlayerManager';
import { entitys } from "../../../wailsjs/go/models";
import Player = entitys.Player;
import Tournament = entitys.Tournament;
import { TestTournament } from '../../../wailsjs/go/entitys/TournamentManager'; // Adjust the import path as needed

type Props = {};

const HomePage = (props: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<Player | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const tournamentData: Tournament = await TestTournament();
        setTournament(tournamentData);
      } catch (error) {
        console.error('Error fetching tournament:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchTournament();
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const player: Player = await CreatePlayer(name, email);
      setResult(player);
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Validate Form</button>
      </form>
      {result && (
        <div>
          <h2>Player Created:</h2>
          <p>Name: {result.name}</p>
          <p>Email: {result.email}</p>
        </div>
      )}
      {isLoading ? (
        <p>Loading tournament data...</p>
      ) : (
        tournament && (
          <div>
            <h2>Tournament Details:</h2>
            <p>Name: {tournament.name}</p>
            <p>Number of Rounds: {tournament.numberOfRounds}</p>
            <h3>Players:</h3>
            <ul>
              {tournament.players && tournament.players.map((player, index) => (
                <li key={index}>
                  {player.name} - {player.email}
                </li>
              ))}
            </ul>
            <h3>Rounds:</h3>
            {tournament.rounds && tournament.rounds.map((round, index) => (
              <div key={index}>
                <h4>Round {index + 1}</h4>
                {round.map((match, matchIndex) => (
                  <div key={matchIndex}>
                    <h5>Match {matchIndex + 1}</h5>
                    <ul>
                      {match.players.map((player, playerIndex) => (
                        <li key={playerIndex}>
                          {player.name} - {player.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default HomePage;