// chapterRow.controller.ts

type Chapter = {
  id: number
  title: string
}

type selectedChapter = {
  value: number
  label: string
}

export class ChapterRowController {
  public chapters: Chapter[] = []
  public chapitersFilter: Chapter[][] = []
  public chapitersFiltered: Chapter[] = []

  public selectedChapters: selectedChapter[] = []

  public getAllChapters: () => Promise<Chapter[]> // ou le bon type de retour

  constructor(getAllChapters: () => Promise<Chapter[]>) {
    this.getAllChapters = getAllChapters
  }

  async setup() {
    this.chapters = await this.getAllChapters()
    this.chapitersFilter = this.chunkArray(this.chapters, 50).reverse()

    this.selectedChaptersArray()
    this.chapitersFiltered = this.chapitersFilter[0].reverse()
  }

  private chunkArray(array: Chapter[], size: number) {
    const result: Chapter[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  public selectedChaptersArray() {
    const lengthChapiters = this.chapitersFilter.length
    for (let i = 0; i < lengthChapiters; i++) {
      for (let j = 0; j < this.chapitersFilter[i].length; j++) {
        if (j % 50 === 0) {
          this.selectedChapters.push({
            value: i,
            label: `${this.chapitersFilter[i][j].id} > ${this.chapitersFilter[i][j].id + 50}`,
          })
        }
      }
    }
  }

  public updateSelectedChapters(chapter: selectedChapter) {
    this.chapitersFiltered = this.chapitersFilter[chapter.value]
  }
}
