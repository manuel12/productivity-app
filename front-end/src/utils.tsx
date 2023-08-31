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

interface Daily {
  completed: boolean
  dailyText: string
  dateCreated: Date | string
}

/**
 * Checks if it's a new day compared to the dateCreated property of the daily
 * and updates the completed property accordingly.
 *  * @param {object} daily - The daily object to check.
 */
export const checkAndUpdateCompletedStatus = (daily: Daily) => {
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
  }
  return daily
}
