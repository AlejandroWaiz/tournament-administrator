package entitys

import "context"

type PlayerManager struct {
	ctx context.Context
}

type Player struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	JanoDolares int32  `json:"janodolares"`
}

var AllPlayers []Player

func (pm *PlayerManager) CreatePlayer(Name, Email string) Player {

	p := Player{"0", Name, Email, "", 0}

	AllPlayers = append(AllPlayers, p)

	return p

}

func (pm *PlayerManager) GetExamplePlayers() []Player {
	return ExamplePlayers
}

var ExamplePlayers = []Player{
	{"1", "Jugador 1", "jugador1@gmail.com", "password1", 100},
	{"2", "Jugador 2", "jugador2@gmail.com", "password2", 100},
	{"3", "Jugador 3", "jugador3@gmail.com", "password3", 100},
	{"4", "Jugador 4", "jugador4@gmail.com", "password4", 100},
	{"5", "Jugador 5", "jugador5@gmail.com", "password5", 100},
	{"6", "Jugador 6", "jugador6@gmail.com", "password6", 100},
	{"7", "Jugador 7", "jugador7@gmail.com", "password7", 100},
	{"8", "Jugador 8", "jugador8@gmail.com", "password8", 100},
	{"9", "Jugador 9", "jugador9@gmail.com", "password9", 100},
	{"10", "Jugador 10", "jugador10@gmail.com", "password10", 100},
	{"11", "Jugador 11", "jugador11@gmail.com", "password11", 100},
	{"12", "Jugador 12", "jugador12@gmail.com", "password12", 100},
	{"13", "Jugador 13", "jugador13@gmail.com", "password13", 100},
	{"14", "Jugador 14", "jugador14@gmail.com", "password14", 100},
	{"15", "Jugador 15", "jugador15@gmail.com", "password15", 100},
	{"16", "Jugador 16", "jugador16@gmail.com", "password16", 100},
}
