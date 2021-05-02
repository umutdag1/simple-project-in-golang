package main

import (
	"contact-form-rest-api/helper"
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

const dbName = "Example"
const collectionName = "contactInfo"

type Person struct {
	Name    string `json:"name,omitempty" bson:"name,omitempty"`
	Email   string `json:"email,omitempty" bson:"email,omitempty"`
	Message string `json:"message,omitempty" bson:"Message,omitempty"`
}

var collection = helper.ConnectDB(dbName, collectionName)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/saveContact", saveContact).Methods("POST", "OPTIONS")

	headersOk := handlers.AllowedHeaders([]string{"content-type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	router.Use(handlers.CORS(originsOk, headersOk, methodsOk))

	log.Fatal(http.ListenAndServe(":8000", (router)))

}

func saveContact(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var person Person

	_ = json.NewDecoder(r.Body).Decode(&person)

	result, err := collection.InsertOne(context.TODO(), person)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	//fmt.Fprintf(w, "Person: %+v", person)

	json.NewEncoder(w).Encode(result)
}
