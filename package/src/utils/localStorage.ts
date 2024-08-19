/**
 * Retrieves data from local storage based on a given key.
 *
 * @param {string} key - The key to retrieve data from local storage.
 * @param {T} initialValue - The initial value to return if no data is found.
 * @returns {T} The data retrieved from local storage, or the provided initial value if no data is found or an error occurs.
 */
function getLocalStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue
  }
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key)
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.log(error)
    return initialValue
  }
}

/**
 * Sets data into local storage based on a given key.
 *
 * @param {string} key - The key to set data into local storage.
 * @param {T} value - The value to be set into local storage.
 * @returns {boolean} True if the operation is successful, otherwise false.
 */
function setLocalStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    // set to local storage by key
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * Removes data from local storage based on a given key.
 *
 * @param {string} key - The key to remove data from local storage.
 * @returns {boolean} True if the operation is successful, otherwise false.
 */
function removeLocalStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    // set to local storage by key
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export { getLocalStorage, setLocalStorage, removeLocalStorage }
