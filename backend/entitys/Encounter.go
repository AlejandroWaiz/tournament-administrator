package entitys

type Encounter struct {
	ID       int `json:"id"`
	MatchID  int `json:"match_id"`
	WinnerID int `json:"winner_id"`
	LoserID  int `json:"loser_id"`
}
