package entitys

type Tournament struct {
	Name           string
	Players        []Player
	Rounds         []Match
	NumberOfRounds int
}