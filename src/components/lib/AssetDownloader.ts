import Axios from 'axios'

export default class AssetDownloader {
  public static async download(name: string): Promise<Blob> {
    const assetsPath = `/${name}`
    return Axios.get(assetsPath, { responseType: 'blob' }).then(res => {
      return new Blob([res.data], {
        type: res.data.type,
      })
    })
  }
}
