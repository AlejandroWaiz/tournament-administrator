package entitys

type Encounter struct {
	Participants []Player `json:"participants"`
	Winner       Player   `json:"encounterWinner"`
	Loser        Player   `json:"encounterLoser"`
}