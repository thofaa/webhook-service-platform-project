package main

import (
	"log"
	"net/http"
	"os"

	"syntro-webhook/internal/api"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/v1/portal/session", api.HandleCreateSession())
	mux.Handle("/api/v1/events/stream", api.JWTMiddleware(http.HandlerFunc(handleEventStream)))

	addr := os.Getenv("ADDR")
	if addr == "" {
		addr = ":8080"
	}
	log.Printf("listening on %s", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}

func handleEventStream(w http.ResponseWriter, r *http.Request) {
	tenantID, _ := r.Context().Value(api.TenantIDKey).(string)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"tenant_id":"` + tenantID + `","stream":"ok"}`))
}
