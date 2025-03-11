package entitys

import (
	"math/rand"
	"sync"
	"time"
)

type TournamentManager struct {
	mu sync.Mutex
}

type Tournament struct {
	ID             int      `json:"id"`
	Name           string   `json:"name"`
	NumberOfRounds int      `json:"number_of_rounds"`
	Players        []Player `json:"players,omitempty"`
	Rounds         []Round  `json:"rounds,omitempty"`
}

type TournamentPlayer struct {
	TournamentID int `json:"tournament_id"`
	PlayerID     int `json:"player_id"`
}

var Tournaments []Tournament

func (tm *TournamentManager) CreateTournament(name string, rounds int, players []Player) Tournament {

	t := Tournament{len(Tournaments), name, rounds, players, []Round{}}

	return t

}

func sortPlayers(tournament Tournament) Tournament {
	r := rand.New(rand.NewSource(time.Now().Unix()))
	players := make([]Player, len(tournament.Players))
	copy(players, tournament.Players)
	sortedPlayers := make([]Player, 0, len(players))
	n := len(players)
	for i := 0; i < n; i++ {
		randIndex := r.Intn(len(players))
		sortedPlayers = append(sortedPlayers, players[randIndex])
		players = append(players[:randIndex], players[randIndex+1:]...)
	}
	tournament.Players = sortedPlayers
	return tournament
}
