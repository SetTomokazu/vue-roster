import AssetDownload from '@/components/lib/AssetDownloader'
import { saveAs } from 'file-saver'
export default class RosterExporter {
  public static async export() {
    AssetDownload.download('rdx_roster_template.xlsx').then(blob => {
      saveAs(blob, 'result.xlsx')
    })
  }
}
