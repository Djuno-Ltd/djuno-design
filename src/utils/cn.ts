import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

const cn = (...args: classNames.ArgumentArray) => {
  return twMerge(classNames(args))
}
export default cn
