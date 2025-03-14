package entitys

type Match struct {
	ID                 int         `json:"id"`
	RoundID            int         `json:"round_id"`
	NumberOfEncounters int         `json:"number_of_encounters"`
	Player1            Player      `json:"player1"`
	Player2            Player      `json:"player2"`
	Player1Score       int         `json:"player1_score"`
	Player2Score       int         `json:"player2_score"`
	Encounters         []Encounter `json:"encounters,omitempty"`
}
