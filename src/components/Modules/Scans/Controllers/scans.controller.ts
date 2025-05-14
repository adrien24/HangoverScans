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

  public imagesScans: string[] = []
  public titleScan: string = ''

  public getChapter: () => Promise<Chapter> // ou le bon type de retour

  private historyParsed: { chapter: number; pages: number }[] = []

  constructor(getAllScans: () => Promise<Chapter>) {
    this.getChapter = getAllScans
  }

  async setup() {
    this.scans = await this.getChapter()
    this.imagesScans = this.scans.images
    this.titleScan = this.scans.title

    this.getHistoryPages('OnePiece', this.scans.id)
  }

  public getHistoryPages(nameScan: string, chapter: number) {
    const history = localStorage.getItem(`history-${nameScan}`)
    if (history) this.historyParsed = JSON.parse(history)
    else {
      this.historyParsed = [
        {
          chapter: chapter,
          pages: 0,
        },
      ]
      localStorage.setItem(`history-${nameScan}`, JSON.stringify(this.historyParsed))
    }
  }

  // public updateHistoryPages(nameScan: string, chapter: number, pages: number) {
  //   this.historyParsed.find((history) => history.chapter === chapter)?.pages = pages
  //   console.log('existingHistory', existingHistory)

  //   if (existingHistory) {
  //     this.historyParsed = [
  //       ...this.historyParsed,
  //       {
  //         chapter: chapter,
  //         pages: pages,
  //       },
  //     ]
  //   } else {
  //     this.historyParsed = [
  //       ...this.historyParsed,
  //       {
  //         chapter: chapter,
  //         pages: pages,
  //       },
  //     ]
  //   }
  //   localStorage.setItem(`history-${nameScan}`, JSON.stringify(this.historyParsed))

  //   console.log('historyParsed', this.historyParsed)
  // }
}
