import IDaily from "../src/interfaces/IDaily"
import ITodo from "./interfaces/ITodo"

/**
 * Stores an item with the specified key in localStorage.
 * @param {string} key - The key to use for storing the item.
 * @param {any} data - The data to store in localStorage (will be JSON-stringified).
 */
export const setItem = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Retrieves an item from localStorage by its key.
 * @param {string} key - The key of the item to retrieve.
 * @returns {any | null} The stored item or null if it doesn't exist.
 */
export const getItem = (key: string): any | null => {
  const item = localStorage.getItem(key)

  if (item === null) {
    return null
  }

  return JSON.parse(item)
}

const differenceInDays = (date1: any, date2: any) => {
  const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds

  // Convert both dates to UTC to ensure the same day is being compared
  const utcDate1 = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  )
  const utcDate2 = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  )

  // Calculate the difference in milliseconds
  const timeDifference = utcDate2 - utcDate1

  // Convert the difference to days
  const daysDifference = Math.floor(timeDifference / oneDay)

  return daysDifference
}

/**
 * Checks if it's a new day compared to the lastCompletedDate property of the daily
 * and updates the completed property accordingly.
 *  * @param {IDaily} daily - The daily object to check.
 */
export const checkAndUpdateCompletedStatus = (daily: IDaily) => {
  const currentDate = new Date()

  if (daily.lastCompletedDate) {
    const lastCompletedDate = new Date(daily.lastCompletedDate)

    // Check if it's a new day
    if (
      currentDate.getDate() !== lastCompletedDate.getDate() ||
      currentDate.getMonth() !== lastCompletedDate.getMonth() ||
      currentDate.getFullYear() !== lastCompletedDate.getFullYear()
    ) {
      // It's a new day, update the completed property
      daily.completed = false
    }
  }
  return daily
}

/**
 * Checks and updates the streak counter of a daily task based on the last completed date.
 * If the last completed date is more than 1 day ago, resets the streak counter to 0.
 *
 * @param {IDaily} daily - The daily task object containing completed status and last completed date.
 */
export const checkAndUpdateStreakCounter = (daily: IDaily) => {
  const currentDate = new Date()

  if (daily.lastCompletedDate) {
    const lastCompletedDate = new Date(daily.lastCompletedDate)

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - lastCompletedDate.getTime()

    // Calculate the number of days between currentDate and lastCompletedDate
    const daysDifference = differenceInDays(lastCompletedDate, currentDate)

    if (daysDifference > 1) {
      daily.streakCounter = 0
    }
  }
  return daily
}

/**
 * Calculates the number of completed todos in the given array of todos.
 *
 * @param {ITodo[]} todos - The array of todo items.
 * @returns {number} The number of completed todos.
 */
export const getNumCompletedTodos = (todos: ITodo[]) => {
  return todos.filter((todo) => todo.completed === true).length
}

/**
 * Calculates the number of completed todos for today.
 *
 * @param {ITodo[]} todos - The array of todo items.
 * @returns {number} The number of completed todos for today.
 */
export const getNumCompletedTodosToday = (todos: ITodo[]) => {
  const todaysDate = new Date().toISOString().split("T")[0]
  return todos.filter((todo) => {
    const todosDate = todo.dateCompleted?.split("T")[0]
    return todaysDate === todosDate
  }).length
}

/**
 * Calculates the average number of completed todos per day in the given array of todos.
 *
 * @param {ITodo[]} todos - The array of todo items.
 * @returns {number} The average number of completed todos per day.
 */
export const getAvgDailyCompletedTodos = (todos: ITodo[]) => {
  const todosPerDate: any = {}

  todos.forEach((todo) => {
    if (todo.completed) {
      const dateKey = todo.dateCompleted?.split("T")[0]
      if (dateKey) {
        todosPerDate[dateKey] = (todosPerDate[dateKey] || 0) + 1
      }
    }
  })

  const totalDaysOfCompletedTodos = Object.keys(todosPerDate).length

  const totalCompletedTodos = todos.filter(
    (todo) => todo.completed === true
  ).length

  if (totalDaysOfCompletedTodos === 0) {
    return 0
  }

  const avgDailyCompletedTodos = parseFloat(
    String(totalCompletedTodos / totalDaysOfCompletedTodos)
  ).toFixed(1)

  return Number(avgDailyCompletedTodos)
}

/**
 * Calculates the percentage difference between the number of completed todos
 * and the average number of completed todos.
 *
 * @param {number} numCompleted - The number of completed todos.
 * @param {number} numAvgCompleted - The average number of completed todos.
 * @returns {string} The percentage difference as a string with no decimal places.
 */
export const percentageDiff = (
  numCompleted: number,
  numAvgCompleted: number
) => {
  if (numCompleted === numAvgCompleted) return 0
  if (numCompleted === 0 || numAvgCompleted === 0) return 0
  else if (numCompleted > numAvgCompleted)
    return percentageIncrease(numCompleted, numAvgCompleted)
  else if (numAvgCompleted > numCompleted)
    return percentageDecrease(numCompleted, numAvgCompleted)
  else return 0
}

/**
 * Calculates the percentage increase between the number of completed todos
 * and the average number of completed todos.
 *
 * @param {number} numCompleted - The number of completed todos.
 * @param {number} numAvgCompleted - The average number of completed todos.
 * @returns {string} The percentage increase as a string with no decimal places preceded by a (+) sign.
 */
export const percentageIncrease = (
  numCompleted: number,
  numAvgCompleted: number
) => {
  return `+${(
    ((numCompleted - numAvgCompleted) / numAvgCompleted) *
    100
  ).toFixed(0)}`
}

/**
 * Calculates the percentage decrease between the number of completed todos
 * and the average number of completed todos.
 *
 * @param {number} numCompleted - The number of completed todos.
 * @param {number} numAvgCompleted - The average number of completed todos.
 * @returns {string} The percentage decrease as a string with no decimal places preceded by a (-) sign.
 */
export const percentageDecrease = (
  numCompleted: number,
  numAvgCompleted: number
) => {
  return `-${(
    ((numAvgCompleted - numCompleted) / numAvgCompleted) *
    100
  ).toFixed(0)}`
}
