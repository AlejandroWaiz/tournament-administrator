package entitys

type Match struct {
	Encounters         []Encounter
	NumberOfEncounters int
	Players            []Player
	Winner, Loser      []Player
}