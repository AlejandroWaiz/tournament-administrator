package entitys

import "context"

type PlayerManager struct {
	ctx context.Context
}

type Player struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	JanoDolares int32 `json:"janodolares"`
}

var AllPlayers []Player

func (pm *PlayerManager) CreatePlayer(Name, Email string)Player{

	p := Player{Name, Email, "", 0}

	AllPlayers = append(AllPlayers, p)

	return p

}