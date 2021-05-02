package models

type Person struct {
	Name    string `json:"name,omitempty" bson:"name,omitempty"`
	Email   string `json:"email,omitempty" bson:"email,omitempty"`
	Message string `json:"message,omitempty" bson:"Message,omitempty"`
}
