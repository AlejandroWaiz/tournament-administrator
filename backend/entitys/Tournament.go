package entitys

import (
	"errors"
	"log"
	"math/rand"
	"sync"
	"time"

	"github.com/dchest/uniuri"
)

type TournamentManager struct {
	mu sync.Mutex
}

type Tournament_Direct_Elimination struct {
	ID             string   `json:"id,omitempty"`
	Name           string   `json:"name"`
	Players        []Player `json:"players,omitempty"`
	Rounds         []Round  `json:"rounds,omitempty"`
	PlayThirdPlace bool     `json:"playThirdPlace,omitempty"`
	CurrentRound   int      `json:"currentRound"`
	IsEnded        bool     `json:"isEnded"`
}

type TournamentPlayer struct {
	TournamentID string `json:"tournament_id"`
	PlayerID     string `json:"player_id"`
}

var Tournaments []Tournament_Direct_Elimination

func (tm *TournamentManager) GetTournamentById(id string) (Tournament_Direct_Elimination, error) {
	for _, t := range Tournaments {
		if t.ID == id {
			return t, nil
		}
	}
	return Tournament_Direct_Elimination{}, errors.New("Could not find tournament, invalid ID")
}

func (tm *TournamentManager) UpdateTournament(tournamentID string, roundID string, results map[string][2]int) (Tournament_Direct_Elimination, error) {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	log.Printf("Torneo recibido de ID %v actualizando la ronda %v con los resultados %v", tournamentID, roundID, results)

	var tournament *Tournament_Direct_Elimination
	for i := range Tournaments {
		if Tournaments[i].ID == tournamentID {
			tournament = &Tournaments[i]
			break
		}
	}
	if tournament == nil {
		return Tournament_Direct_Elimination{}, errors.New("invalid tournament ID")
	}

	var currentRound *Round
	for i := range tournament.Rounds {
		if tournament.Rounds[i].ID == roundID {
			currentRound = &tournament.Rounds[i]
			break
		}
	}
	if currentRound == nil {
		return Tournament_Direct_Elimination{}, errors.New("round ID out of range")
	}

	nextRoundID := uniuri.New()
	nextRound := Round{ID: nextRoundID, TournamentID: tournamentID, Matches: []Match{}, RoundNumber: currentRound.RoundNumber + 1}
	tournament.Rounds = append(tournament.Rounds, nextRound)

	for matchID, scores := range results {
		for i := range currentRound.Matches {
			if currentRound.Matches[i].ID == matchID {
				currentRound.Matches[i].Player1Score = scores[0]
				currentRound.Matches[i].Player2Score = scores[1]
				winner := currentRound.Matches[i].Player1
				if scores[1] > scores[0] {
					winner = currentRound.Matches[i].Player2
				}
				nextRound.Matches = append(nextRound.Matches, Match{
					ID:                 uniuri.New(),
					RoundID:            nextRoundID,
					NumberOfEncounters: 1,
					Player1:            winner,
				})
				break
			}
		}
	}

	for i := 0; i < len(nextRound.Matches); i += 2 {
		if i+1 < len(nextRound.Matches) {
			nextRound.Matches[i].Player2 = nextRound.Matches[i+1].Player1
		} else {
			nextRound.Matches[i].Player2 = Player{ID: uniuri.New(), Name: "BYE"}
			nextRound.Matches[i].Player1Score = 1
		}
	}

	// Incrementar la ronda actual
	tournament.CurrentRound++

	// Verificar si el torneo ha terminado
	if tournament.CurrentRound > len(tournament.Rounds) {
		tournament.IsEnded = true
	}

	log.Printf("torneo final a enviar al frontend: %v", tournament)

	return *tournament, nil
}

func (tm *TournamentManager) CreateTournament(name string, playThirdPlace bool, players []Player) Tournament_Direct_Elimination {
	tm.mu.Lock()
	defer tm.mu.Unlock()

	t := Tournament_Direct_Elimination{
		ID:             uniuri.New(),
		Name:           name,
		PlayThirdPlace: playThirdPlace,
		Players:        players,
		Rounds:         []Round{},
		CurrentRound:   1,
		IsEnded:        false,
	}

	numPlayers := len(players)
	numRounds := calculateRounds(numPlayers)

	r := rand.New(rand.NewSource(time.Now().Unix()))
	shuffledPlayers := shufflePlayers(players, r)
	initialRound := Round{ID: uniuri.New(), TournamentID: t.ID, Matches: []Match{}, RoundNumber: 1}

	for i := 0; i < len(shuffledPlayers); i += 2 {
		if i+1 < len(shuffledPlayers) {
			match := Match{
				ID:                 uniuri.New(),
				RoundID:            initialRound.ID,
				NumberOfEncounters: 1,
				Player1:            shuffledPlayers[i],
				Player2:            shuffledPlayers[i+1],
			}
			initialRound.Matches = append(initialRound.Matches, match)
		} else {
			match := Match{
				ID:                 uniuri.New(),
				RoundID:            initialRound.ID,
				NumberOfEncounters: 1,
				Player1:            shuffledPlayers[i],
				Player2:            Player{ID: uniuri.New(), Name: "BYE"},
			}
			initialRound.Matches = append(initialRound.Matches, match)
		}
	}
	t.Rounds = append(t.Rounds, initialRound)

	for roundID := 1; roundID < numRounds; roundID++ {
		round := Round{ID: uniuri.New(), TournamentID: t.ID, Matches: []Match{}, RoundNumber: roundID + 1}
		t.Rounds = append(t.Rounds, round)
	}

	if playThirdPlace && numRounds > 1 {
		thirdPlaceRound := Round{ID: uniuri.New(), TournamentID: t.ID, Matches: []Match{}, RoundNumber: len(t.Rounds) + 1}
		t.Rounds = append(t.Rounds, thirdPlaceRound)
	}

	Tournaments = append(Tournaments, t)
	log.Printf("torneo recien creado: %v", t)
	return t
}

func calculateRounds(numPlayers int) int {
	rounds := 0
	for numPlayers > 1 {
		numPlayers = (numPlayers + 1) / 2
		rounds++
	}
	return rounds
}

func shufflePlayers(players []Player, r *rand.Rand) []Player {
	shuffled := make([]Player, len(players))
	copy(shuffled, players)
	r.Shuffle(len(shuffled), func(i, j int) {
		shuffled[i], shuffled[j] = shuffled[j], shuffled[i]
	})
	return shuffled
}
