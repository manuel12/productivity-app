export default interface IDaily {
  id?: number
  completed: boolean
  description: string
  dateCreated: Date | string
  streakCounter: number
  lastCompletedDate?: Date | string
}
