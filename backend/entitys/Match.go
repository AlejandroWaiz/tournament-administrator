package entitys

type Match struct {
	ID                 int         `json:"id"`
	RoundID            int         `json:"round_id"`
	NumberOfEncounters int         `json:"number_of_encounters"`
	WinnerID           int         `json:"winner_id"`
	LoserID            int         `json:"loser_id"`
	Encounters         []Encounter `json:"encounters,omitempty"`
}
