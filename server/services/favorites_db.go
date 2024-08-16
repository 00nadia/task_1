package services

import "task/system"

type Favorite struct {
	ID      int    `json:"id"`
	Created string `json:"created"`
	Updated string `json:"updated"`
    Title string `json:"title"`
    Image string `json:"image"`
}

type NewFav struct {
    FavID int `json:"favid"`
    FavTitle string `json:"favtitle"`
    FavImage string `json:"favimage"`
}

func dest(fav *Favorite) []interface{} {
    return []interface{}{
        &fav.ID,
        &fav.Created,
        &fav.Updated,
        &fav.Title,
        &fav.Image,
    }
}

func selectAllFavorites() ([]Favorite, error) {
    rows, err := system.Db.Query("select * from favorites")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var favs []Favorite = make([]Favorite, 0)
    for rows.Next() {
        fav := Favorite{}
        err = rows.Scan(dest(&fav)...)
        if err != nil {
            return nil, err
        }
        favs = append(favs, fav)
    }
    return favs, nil
}

func insertFav(data NewFav) (NewFav, error){
    insert := `
    insert into favorites (id, title, image)
    values ( $1, $2, $3);`
    _, err := system.Db.Query(insert, data.FavID, data.FavTitle, data.FavImage )
    if err != nil {
        return data, err
    }
    return data, nil
}

// func deleteFav(id int) (error){
//     delete := `
//     delete from favorites
//     where id = $1 ;`
//     _, err := system.Db.Query(delete, id)
//     if err != nil {
//         return  err
//     }
//     return  err
// }