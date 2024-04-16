/**
 * Copies the specified text to the clipboard.
 *
 * @param {string} text - The text to be copied.
 * @param {object} [options] - Optional configuration for copying to clipboard.
 * @param {string} [options.successMessage] - Success message to be displayed.
 * @param {string} [options.faildMessage] - Failure message to be displayed.
 * @returns {Promise<string>} A promise that resolves when the operation is completed.
 *
 * @example
 * // Example usage:
 * copyToClipboard('Hello, world!')
 * .then((message: string) => {
 *   console.log(message);
 * })
 * .catch((error) => {
 *   console.error('Error copying text:', error);
 * });
 */
const copyToClipboard = (
  text: string,
  options?: {
    successMessage?: string
    faildMessage?: string
  },
): Promise<string> => {
  const successMessage = options?.successMessage || 'Text copied to clipboard successfully!'
  const faildMessage = options?.faildMessage || 'Failed to copy data to clipboard.'
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && window.isSecureContext) {
      window.navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve(successMessage)
        })
        .catch(() => {
          reject(new Error(faildMessage))
        })
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement('textarea')
      textArea.value = text

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'

      document.body.prepend(textArea)
      textArea.select()

      try {
        document.execCommand('copy')
        resolve(successMessage)
      } catch (error) {
        options?.faildMessage && console.error(options.faildMessage)
        reject(new Error(faildMessage))
      } finally {
        textArea.remove()
      }
    }
  })
}

export { copyToClipboard }
