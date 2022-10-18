import axios from 'axios'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export class HttpRequests {

  url_root = "https://api.jikan.moe/v4/top/"

  public async get(endpoint: string, pages: number) {
    let url = this.url_root + endpoint
    let data: any[] = []

    for (let i = 1; i <= pages; i++) {
      await axios.get(url, {
        params: {
          page: i
        }
      })
        .then((res) => {
          let tempData: object[] = res['data']['data']
          tempData.forEach(e => data.push(e))
        })
      await delay(600);
    }
    return data
  }
}
