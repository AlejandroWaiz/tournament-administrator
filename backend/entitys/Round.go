package entitys

type Round struct {
	ID           int     `json:"id"`
	TournamentID int     `json:"tournament_id"`
	RoundNumber  int     `json:"round_number"`
	Matches      []Match `json:"matches,omitempty"`
}
