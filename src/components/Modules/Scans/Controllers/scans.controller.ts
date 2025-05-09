// chapterRow.controller.ts

type Chapter = {
  id: number
  title: string
}

export class ScansController {
  public scans: Chapter = {
    id: 0,
    title: '',
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
    this.titleScan = this.scans.title
  }
}
