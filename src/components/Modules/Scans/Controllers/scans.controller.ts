// chapterRow.controller.ts

type Chapter = {
  id: number
  title: string
  description: string
  images: string[]
}

export class ScansController {
  public scans: Chapter = {
    id: 0,
    title: '',
    description: '',
    images: [],
  }
  public isReading: boolean = false

  public imagesScans: { url: string; loaded: boolean }[] = []
  public titleScan: string = ''

  public getChapter: () => Promise<Chapter> // ou le bon type de retour

  private historyParsed: { chapter: number; pages: number }[] = []

  constructor(getAllScans: () => Promise<Chapter>) {
    this.getChapter = getAllScans
  }

  async setup() {
    this.scans = await this.getChapter()

    this.imagesScans = this.scans.images.map((img) => ({ url: img, loaded: false }))
    console.log(this.imagesScans)

    this.titleScan = this.scans.title
  }

  public updateHistoryPages(nameScan: string, chapter: number, pages: number) {
    const history = localStorage.getItem(`scans-${nameScan}`)
    if (history) this.historyParsed = JSON.parse(history)

    const index = this.historyParsed.findIndex((item) => item.chapter === chapter)

    if (index !== -1) {
      this.historyParsed[index].pages = pages
    } else {
      this.historyParsed.push({ chapter, pages: pages })
    }
    localStorage.setItem(`scans-${nameScan}`, JSON.stringify(this.historyParsed))
  }

  public setPagesScans(nameScan: string, chapter: number) {
    const history = localStorage.getItem(`scans-${nameScan}`)
    if (history) this.historyParsed = JSON.parse(history)

    const index = this.historyParsed.findIndex((item) => item.chapter === chapter)

    return this.historyParsed[index] ? this.historyParsed[index].pages : 0
  }
}
