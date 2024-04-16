/**
 * Pauses execution for a specified duration.
 *
 * @param {number} ms - The duration to sleep in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export { sleep }
