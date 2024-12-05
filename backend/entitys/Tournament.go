package entitys

import (
	"fmt"
	"log"
	"math/rand"
	"strconv"
	"sync"
	"time"
)

type TournamentManager struct {
	mu sync.Mutex
}

type Tournament struct {
	Name           string    `json:"name"`
	Players        []Player  `json:"players"`
	Rounds         [][]Match `json:"rounds"`
	allMatchs      []Match   `json:"allMatchs"`
	NumberOfRounds int       `json:"numberOfRounds"`
}

var Tournaments []Tournament

func (tm *TournamentManager) TestTournament() Tournament {
	log.Println("first execution")
	tm.mu.Lock()
	defer tm.mu.Unlock()

	players := []Player{}

	for i := 0; i < 20; i++ {

		p := Player{Name: fmt.Sprintf("Player %v", strconv.Itoa(i))}

		players = append(players, p)
	}

	tournament := tm.CreateTournament(players)

	tournament.Name = "hola"

	return tournament

}

func (tm *TournamentManager) CreateTournament(players []Player) Tournament {

	Tournament := Tournament{}

	log.Printf("before setting matches these are the players: %v", players)

	Tournament.Players = append(Tournament.Players, players...)

	finalTournament := tm.SetInitialMatches(Tournament)

	log.Printf("and after setting matches this are the players: %v", finalTournament.Players)

	return finalTournament

}

func (tm *TournamentManager) SetInitialMatches(tournament Tournament) Tournament {

	sortedTournament := sortPlayers(tournament)

	match := Match{}
	tournament.Rounds = append(tournament.Rounds, []Match{})
	//matchcounter := 0
	for i := range sortedTournament.Players {
		log.Printf("Player in position %v is %v", i, sortedTournament.Players[i].Name)
	}

	//todo: repair this logic cause is bad, is adding repeated players
	for i := 0; i < len(sortedTournament.Players); i++ {

		if len(match.Players) < 2 {

			match.Players = append(match.Players, sortedTournament.Players[i])

		}

		if len(match.Players) == 2 {
			tournament.Rounds[0] = append(tournament.Rounds[0], match)
			log.Printf("match %v with players: %v - %v", len(tournament.Rounds[0]), match.Players[0].Name, match.Players[1].Name)
			match = Match{} // Reset match
		}
	}

	return tournament
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
