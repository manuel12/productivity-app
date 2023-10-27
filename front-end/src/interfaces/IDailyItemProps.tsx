import IDaily from "./IDaily"

export default interface IDailyItemProps {
  index: number
  daily: IDaily
  dailies: IDaily[]
  setDailies: (dailies: IDaily[]) => void
  setCompletedDailies: (completedDailies: number) => void
}
