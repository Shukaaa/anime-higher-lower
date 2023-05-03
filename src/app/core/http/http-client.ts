import axios from 'axios'
import {delay, randomInt} from '../utils/utils'
import {Injectable} from "@angular/core";

@Injectable()
export class HttpClient {

  url_root = "https://api.jikan.moe/v4/top/"

  public async getRandomEntry(endpoint: string, limit: number): Promise<object> {
    let randomAnime1 = await this.get(endpoint, randomInt(1, limit))
    let randomAnime2 = await this.get(endpoint, randomInt(1, limit))

    while (true) {
      if (randomAnime1[0]["mal_id"] != randomAnime2[0]["mal_id"]) {
        break
      }

      console.log("ANIMES MATCHING, RETRYING...")
      await delay(500)

      randomAnime2 = await this.get("anime", randomInt(1, limit))
    }

    return [randomAnime1[0], randomAnime2[0]]
  }

  private async get(endpoint: string, page: number): Promise<any> {
    let url = this.url_root + endpoint
    let data: any[] = []

    await axios.get(url, {
      params: {
        limit: 1,
        page: page,
        filter: "bypopularity"
      }
    }).then((res) => {
      data = res['data']['data']
    }).catch((err) => {
      console.error(err)
    })

    return data
  }
}
