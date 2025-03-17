package entitys

type Round struct {
	ID           string  `json:"id"`
	TournamentID string  `json:"tournament_id"`
	RoundNumber  int     `json:"round_number"`
	Matches      []Match `json:"matches,omitempty"`
}
