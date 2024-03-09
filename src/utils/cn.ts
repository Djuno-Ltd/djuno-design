import classNames from 'classnames'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  prefix: 'dj-',
})

const cn = (...args: classNames.ArgumentArray) => {
  return twMerge(classNames(args))
}
export default cn
