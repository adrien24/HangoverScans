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

  constructor(getAllScans: () => Promise<Chapter>) {
    this.getChapter = getAllScans
  }

  async setup() {
    this.scans = await this.getChapter()
    this.imagesScans = this.scans.images
    this.titleScan = this.scans.title
  }
}
