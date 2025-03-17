import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetTournamentById,
  UpdateTournament,
} from "../../../../wailsjs/go/entitys/TournamentManager";
import { entitys } from "../../../../wailsjs/go/models";

const ShowTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] =
    useState<entitys.Tournament_Direct_Elimination | null>(null);
  const [scores, setScores] = useState<{
    [matchId: string]: { [playerId: string]: number };
  }>({});

  useEffect(() => {
    if (!id) return;

    GetTournamentById(id)
      .then((result) => {
        if (!result.rounds) {
          console.error("Error: el torneo no tiene rondas definidas.");
          return;
        }

        setTournament(result);

        // Inicializar los puntajes en 0 si no existen
        const initialScores: {
          [matchId: string]: { [playerId: string]: number };
        } = {};
        result.rounds[0]?.matches?.forEach((match) => {
          initialScores[match.id] = {
            [match.player1.id]: 0,
            [match.player2.id]: 0,
          };
        });
        setScores(initialScores);
      })
      .catch((error) => {
        console.error("Error al obtener el torneo:", error);
        alert("Torneo no encontrado: " + error.message);
        navigate("/home");
      });
  }, [id, navigate]);

  const handleScoreChange = (
    matchId: string,
    playerId: string,
    delta: number
  ) => {
    setScores((prevScores) => ({
      ...prevScores,
      [matchId]: {
        ...prevScores[matchId],
        [playerId]: Math.max(0, (prevScores[matchId]?.[playerId] ?? 0) + delta),
      },
    }));
  };

  const submitResults = () => {
    if (!tournament?.id) {
      console.error("Error: el torneo no tiene un ID válido.");
      return;
    }

    const formattedScores: { [key: string]: [number, number] } = {};

    if (tournament.rounds && tournament.rounds[0]?.matches) {
      tournament.rounds[0].matches.forEach((match) => {
        formattedScores[match.id] = [
          scores[match.id]?.[match.player1.id] ?? 0,
          scores[match.id]?.[match.player2.id] ?? 0,
        ];
      });
    } else {
      console.error(
        "Error: No hay rondas o partidos disponibles en el torneo."
      );
    }

    const currentRound = tournament.rounds?.find(
      (round) => round.round_number === tournament.currentRound
    );

    if (!currentRound) {
      console.error("Error: No se pudo encontrar la ronda actual.");
      return;
    }

    const currentRoundId = currentRound.id;
    console.log("current round: ", currentRound);

    UpdateTournament(tournament.id, currentRoundId, formattedScores)
      .then((updatedTournament) => {
        console.log("Torneo actualizado recibido del backend:", updatedTournament);
        if (!updatedTournament.rounds) {
          console.error("Error: el torneo actualizado no tiene rondas.");
          return;
        }
        setTournament(updatedTournament);
      })
      .catch((error) => console.error("Error al actualizar el torneo:", error));
  };

  if (!tournament)
    return <p className="text-center text-lg">Cargando torneo...</p>;

  const renderMatch = (match: entitys.Match, roundNumber: number) => (
    <div key={match.id} className="flex flex-col items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="border p-2 rounded">
          <span className="text-lg font-semibold">{match.player1.name}</span>
          <span className="px-3 py-1 bg-gray-200 rounded">
            {scores[match.id]?.[match.player1.id] ?? match.player1_score}
          </span>
          {tournament.currentRound === roundNumber && !tournament.isEnded && (
            <>
              <button
                onClick={() => handleScoreChange(match.id, match.player1.id, -1)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <button
                onClick={() => handleScoreChange(match.id, match.player1.id, 1)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
      <span className="text-lg font-bold">VS</span>
      <div className="flex items-center gap-3">
        <div className="border p-2 rounded">
          <span className="text-lg font-semibold">{match.player2.name}</span>
          <span className="px-3 py-1 bg-gray-200 rounded">
            {scores[match.id]?.[match.player2.id] ?? match.player2_score}
          </span>
          {tournament.currentRound === roundNumber && !tournament.isEnded && (
            <>
              <button
                onClick={() => handleScoreChange(match.id, match.player2.id, -1)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <button
                onClick={() => handleScoreChange(match.id, match.player2.id, 1)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderRound = (round: entitys.Round) => (
    <div key={round.id} className="flex flex-col items-center mx-4">
      <h3 className="text-lg font-semibold mb-2">Ronda {round.round_number}</h3>
      {round.matches?.map((match) => renderMatch(match, round.round_number))}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{tournament.name}</h1>
      <div className="w-full overflow-x-auto">
        <div className="flex">
          {tournament.rounds?.map(renderRound)}
        </div>
      </div>
      {!tournament.isEnded ? (
        <button
          onClick={submitResults}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enviar Resultados
        </button>
      ) : (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">¡Torneo Finalizado!</h2>
          <p className="text-lg">Ganador: {tournament.rounds?.[tournament.rounds.length - 1]?.matches?.[0]?.player1.name}</p>
        </div>
      )}
    </div>
  );
};

export default ShowTournament;