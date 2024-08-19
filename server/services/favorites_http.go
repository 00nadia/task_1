package services

import (
	"log/slog"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetFavorites(c echo.Context) error {
	slog.Info("Getting favorites")
	favs, err := selectAllFavorites()
	if err != nil {
		slog.Error("Error getting favorites", "error", err)
		return c.String(500, "Error getting favorites")
	}
	return c.JSON(200, favs)
}

func Add(c echo.Context) error {
	slog.Info("Adding favorites")
    // So you need NewFav struct here....i wonder what you are sending from the client
	data := NewFav{}
	err := c.Bind(&data)
	if err != nil {
		slog.Error("Error binding data", "error", err)
		return err
	}
	newData, err := insertFav(data)
	if err != nil {
		slog.Error("Error adding favorites", "error", err)
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, newData)
}

// func Delete(c echo.Context) error {
//     slog.Info("deleting fav")
//     id := c.Param("mal_id")
//     err := deleteFav(id)
//     if err != nil {
//         slog.Error("Error deleting favorites")
//         return c.String(500, "Error deleting favorites")
//     }
//     return err

// }
