package auth

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"

	"google.golang.org/api/option"
)
  
func GetAuthManager() (*AuthManager, error) {

	opt := option.WithCredentialsFile("../tournament-administrator-serviceAccountJSON.json")

	ctx := context.Background()

	app, err := firebase.NewApp(ctx, nil, opt)

	if err != nil {
	  return nil, fmt.Errorf("error initializing firebase app: %v", err)
	}

	firebaseAuth, authErr := app.Auth(ctx)

	if authErr != nil {
		return nil, fmt.Errorf("error initializing firebase auth: %v", err)
	  }

	return &AuthManager{ctx, firebaseAuth}, nil

}

type AuthManager struct {
	ctx context.Context
	firebaseAuth  *auth.Client
}

func (am *AuthManager) Login(){

}

//TODO: implement firestore auth but before implementing logic
// func (am *AuthManager) Register(email, username, password string)(model.Player, error){

// 	params := (&auth.UserToCreate{}).Email(email).Password(password)
	
// 	user, err := am.firebaseAuth.CreateUser(am.ctx, params)

// 	Player := model.Player{}

// 	if err != nil {
// 		return model.Player{}, fmt.Errorf("error initializing firebase app: %v", err)
// 	}

	

// }