import { GameType } from "./GameOptions"

export type Entry = {
    game_type: GameType,
    episodes: number,
    favorites: number,
    genres: Genre[],
    images: Images,
    mal_id: number,
    members: number,
    popularity: number,
    rank: number,
    score: number,
    scored_by: number,
    titles: Titles,
    type: string,
    year: number
}

export type Genre = {
    mal_id: number,
    name: string,
    type: string
}

export type Images = {
    image_url: string,
    large_image_url: string,
    small_image_url: string
}

export type Titles = {
    title: string,
    title_english: string,
    title_japanese: string
}