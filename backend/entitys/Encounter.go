package entitys

type Encounter struct {
	Participants  []Player
	Winner, Loser Player
}