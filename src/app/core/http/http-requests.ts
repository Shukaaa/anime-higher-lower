import axios from 'axios'
import { randomInt } from '../utils/utils'

export class HttpRequests {

  url_root = "https://api.jikan.moe/v4/top/"

  public async getRandom(endpoint: string, limit: number) {
    let url = this.url_root + endpoint
    let data: any[] = []

    let randomPageNumber = randomInt(1, limit)

    await axios.get(url, {
      params: {
        page: randomPageNumber,
        limit: 1
      }
    })
      .then((res) => {
        let tempData: object[] = res['data']['data']
        tempData.forEach(e => data.push(e))
      })
    return data
  }
}
