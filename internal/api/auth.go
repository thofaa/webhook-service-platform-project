package api

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type SessionRequest struct {
	TenantID string `json:"tenant_id"`
}

func HandleCreateSession() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Strictly backend-to-backend. NO CORS.
		apiKey := r.Header.Get("X-API-Key")
		if apiKey != "mock_vendor_secret" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		var req SessionRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.TenantID == "" {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}

		secret := os.Getenv("JWT_SECRET")
		if secret == "" {
			secret = "default_secret_for_dev_only"
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"tenant_id": req.TenantID,
			"exp":       time.Now().Add(2 * time.Hour).Unix(),
		})

		tokenString, err := token.SignedString([]byte(secret))
		if err != nil {
			http.Error(w, "Failed to generate token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
	}
}
