import axios from 'axios'
import {delay, randomInt} from '../utils/utils'
import {Injectable} from "@angular/core";
import { Entry, Genre, Images, Titles } from '../types/Entry';
import { GameType } from '../types/GameOptions';

@Injectable()
export class HttpClient {

  url_root = "https://api.jikan.moe/v4/top/"
  delay_time = 1000

  public async getRandomEntry(endpoint: GameType, limit: number): Promise<Entry[]> {
    await delay(this.delay_time)
    let randomAnime1 = await this.get(endpoint, randomInt(1, limit))
    await delay(this.delay_time)
    let randomAnime2 = await this.get(endpoint, randomInt(1, limit))

    while (true) {
      if (randomAnime1.images.image_url == null) {
        await delay(this.delay_time)
        randomAnime1 = await this.get(endpoint, randomInt(1, limit))
      }

      if (randomAnime2.images.image_url == null) {
        await delay(this.delay_time)
        randomAnime2 = await this.get(endpoint, randomInt(1, limit))
      }

      while (true) {
        if (randomAnime1["mal_id"] != randomAnime2["mal_id"]) {
          break
        }

        console.log("ANIMES MATCHING, RETRYING...")
        await delay(this.delay_time)

        randomAnime2 = await this.get("anime", randomInt(1, limit))
      }

      if (randomAnime1.images.image_url != null && randomAnime2.images.image_url != null) {
        break
      }
    }

    return [randomAnime1, randomAnime2]
  }

  private async get(endpoint: GameType, page: number): Promise<Entry> {
    let url = this.url_root + endpoint
    let entry: Entry = {
      game_type: 'anime',
      episodes: 0,
      favorites: 0,
      genres: [],
      images: {
        image_url: '',
        large_image_url: '',
        small_image_url: ''
      },
      mal_id: 0,
      members: 0,
      popularity: 0,
      rank: 0,
      score: 0,
      scored_by: 0,
      titles: {
        title: '',
        title_english: '',
        title_japanese: ''
      },
      type: '',
      year: 0
    }

    await axios.get(url, {
      params: {
        limit: 1,
        page: page,
        filter: "bypopularity"
      }
    }).then((res) => {
      const data = res['data']['data'][0]

      const genres: Genre[] = data["genres"].map(
        (genre: any) => ({
          mal_id: genre["mal_id"],
          name: genre["name"],
          type: genre["type"]
        })
      )

      const images: Images = {
        image_url: data["images"]["jpg"]["image_url"],
        large_image_url: data["images"]["jpg"]["large_image_url"],
        small_image_url: data["images"]["jpg"]["small_image_url"]
      }

      const titles: Titles = {
        title: data["title"],
        title_english: data["title_english"],
        title_japanese: data["title_japanese"]
      }

      let episodes = 0
      if (endpoint == "anime") {
        episodes = data["episodes"]
      } else if (endpoint == "manga") {
        episodes = data["volumes"]
      }

      entry = {
        game_type: endpoint,
        episodes: episodes,
        favorites: data["favorites"],
        genres: genres,
        images: images,
        mal_id: data["mal_id"],
        members: data["members"],
        popularity: data["popularity"],
        rank: data["rank"],
        score: data["score"],
        scored_by: data["scored_by"],
        titles: titles,
        type: data["type"],
        year: data["year"]
      }
    }).catch((err) => {
      console.error(err)
    })

    return entry
  }
}
