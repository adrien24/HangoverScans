// chapterRow.controller.ts

type Chapter = {
  id: number
  title: string
  description: string
  images: string[]
}

export type allChaptersResponse = {
  chapter: number
  title: string
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
  public showHeader: boolean = false
  public isNextChapterAvailable: boolean = true
  public menuItems: ['Lecture verticale/horizontale'] = ['Lecture verticale/horizontale']
  public isSlider: boolean = true

  public getChapter: () => Promise<Chapter> // ou le bon type de retour

  private historyParsed: {
    chapter: number
    pages: number
    finished: 'reading' | 'read'
  }[] = []

  constructor(getAllScans: () => Promise<Chapter>) {
    this.getChapter = getAllScans
  }

  async setup() {
    this.scans = await this.getChapter()

    this.imagesScans = this.scans.images.map((img) => ({ url: img, loaded: false }))

    this.titleScan = this.scans.title
  }

  public toggleHeader() {
    console.log('Toggle header visibility')
    this.showHeader = !this.showHeader
  }

  public updateHistoryPages(
    nameScan: string,
    chapter: number,
    pages: number,
    finished: 'reading' | 'read' = 'reading',
  ) {
    const history = localStorage.getItem(`scans-${nameScan}`)
    if (history) this.historyParsed = JSON.parse(history)

    const index = this.historyParsed.findIndex((item) => item.chapter === chapter)

    if (index !== -1) {
      this.historyParsed[index].pages = pages
      this.historyParsed[index].finished = finished
    } else {
      this.historyParsed.push({ chapter, pages, finished })
    }
    localStorage.setItem(`scans-${nameScan}`, JSON.stringify(this.historyParsed))
  }

  public setPagesScans(nameScan: string, chapter: number) {
    const history = localStorage.getItem(`scans-${nameScan}`)
    if (history) this.historyParsed = JSON.parse(history)

    const index = this.historyParsed.findIndex((item) => item.chapter === chapter)

    return this.historyParsed[index] ? this.historyParsed[index].pages : 0
  }

  public nextChapterAvailable = (id: string, allChapters: allChaptersResponse[]) => {
    const nextChapter = parseInt(id) + 1
    this.isNextChapterAvailable =
      nextChapter <= allChapters.length &&
      allChapters.some((chapter) => chapter.chapter === nextChapter)

    if (!this.isNextChapterAvailable) {
      console.warn('No more chapters available')
      return
    }
  }
  public scansOrientation(scanName: string) {
    localStorage.setItem(`scans-orientation-${scanName}`, this.isSlider ? 'notSlider' : 'slider')

    const orientation = localStorage.getItem(`scans-orientation-${scanName}`)

    return orientation
  }

  public menuItemsClicked(event: string, scans: string) {
    if (event === 'Lecture verticale/horizontale') {
      this.isSlider = !this.isSlider
      this.scansOrientation(scans)
    }
  }
}
