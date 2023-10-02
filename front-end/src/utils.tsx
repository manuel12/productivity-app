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

/**
 * Checks if it's a new day compared to the dateCreated property of the daily
 * and updates the completed property accordingly.
 *  * @param {object} daily - The daily object to check.
 */
export const checkAndUpdateCompletedStatus = (daily: IDaily) => {
  /**
   * @type {Date}
   */
  const currentDate = new Date()

  /**
   * @type {Date}
   */
  const createdDate = new Date(daily.dateCreated)

  // Check if it's a new day
  if (
    currentDate.getDate() !== createdDate.getDate() ||
    currentDate.getMonth() !== createdDate.getMonth() ||
    currentDate.getFullYear() !== createdDate.getFullYear()
  ) {
    // It's a new day, update the completed property
    daily.completed = false

    // Set the dateCreated to the currentDate so that user can only complete
    // the daily once per day and therefore only get 1 streak point for completing
    // the task each day.

    // Before we had the issue where daily was created on say Jan 1st and user would complete
    // and get 1st streak point. Then on Jan 2nd daily would appear uncomplete user would complete
    // and then get 2nd streak point. Then he would reload the page and since Jan 1st !==  Jan 2nd
    // daily appear uncomplete again and user could complete and get a 3rd streak point on the 2nd
    // day. Updating dateCreated solves this issue.
    daily.dateCreated = currentDate
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
  return ((numCompleted / numAvgCompleted) * 100).toFixed(0)
}
