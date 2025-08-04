// chapterRow.controller.ts

export type Chapter = {
  chapter: number
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
  public isLoaded: boolean = false

  public selectedChapters: selectedChapter[] = []

  public getAllChapters: () => Promise<Chapter[]> // ou le bon type de retour

  constructor(getAllChapters: () => Promise<Chapter[]>) {
    this.getAllChapters = getAllChapters
  }

  async setup() {
    this.chapters = await this.getAllChapters()
    this.chapters.sort((a, b) => a.chapter - b.chapter)

    this.chapitersFilter = this.chunkArray(this.chapters, 50)
    this.selectedChaptersArray()
    this.chapitersFiltered = this.chapitersFilter[0]
    this.isLoaded = true
  }

  private chunkArray(array: Chapter[], size: number) {
    const result: Chapter[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }

    return result.reverse()
  }

  public selectedChaptersArray() {
    const lengthChapiters = this.chapitersFilter.length
    for (let i = 0; i < lengthChapiters; i++) {
      for (let j = 0; j < this.chapitersFilter[i].length; j++) {
        if (j % 50 === 0) {
          this.selectedChapters.push({
            value: i,
            label: `${this.chapitersFilter[i][j].chapter} > ${this.chapitersFilter[i][j].chapter + 49}`,
          })
        }
      }
    }
  }

  public updateSelectedChapters(chapter: selectedChapter) {
    const selectedChunk = this.chapitersFilter[chapter.value]
    this.chapitersFiltered = [...selectedChunk]
  }

  public isChapterFinished(title: string, chapterId: number): boolean {
    const chapterStorage = JSON.parse(localStorage.getItem(`scans-${title}`) || '[]')
    return chapterStorage.some(
      (res: { chapter: number; pages: number; finished: 'reading' | 'read' }) =>
        res.chapter === chapterId && res.finished === 'read',
    )
  }

  public isChapterUnread(title: string, chapterId: number): boolean {
    const chapterStorage = JSON.parse(localStorage.getItem(`scans-${title}`) || '[]')
    return !chapterStorage.some(
      (res: { chapter: number; pages: number; finished: 'reading' | 'read' }) =>
        res.chapter === chapterId && (res.finished === 'reading' || res.finished === 'read'),
    )
  }
}
