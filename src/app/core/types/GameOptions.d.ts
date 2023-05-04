export type GameOptions = {
    max_top_amount: number,
    game_type: GameType,
    game_information: GameInformation
}

export type GameType = "anime" | "manga" | "characters"

export type GameInformation = {
    title: boolean,
    title_english: boolean,
    type: boolean,
    episodes: boolean
}