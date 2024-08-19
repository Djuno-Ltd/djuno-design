import classNames from 'classnames'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  prefix: 'dj-',
})

/**
 * Creates a custom classnames function with Tailwind CSS class merging support.
 *
 * @param {...classNames.ArgumentArray} args - The arguments to be passed to the classnames function.
 * @returns {string} A string representing the merged class names.
 */
const cn = (...args: classNames.ArgumentArray): string => {
  return twMerge(classNames(args))
}
export { cn }
