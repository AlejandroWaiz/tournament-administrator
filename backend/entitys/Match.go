package entitys

type Match struct {
	Encounters         []Encounter `json:"encounters"`
	NumberOfEncounters int         `json:"numberOfEncounters"`
	Players            []Player    `json:"players"`
	Winner             Player      `json:"matchWinner"`
	Loser              Player      `json:"matchLoser"`
}