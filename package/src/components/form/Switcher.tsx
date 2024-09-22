import React from 'react'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Loading from './../Loading'
import { SwitcherProps } from '../../types/ISwitcher'
import { cn } from '../../utils/cn'

/**
 * Switcher component.
 *
 * A toggle switch component that can be used to represent an on/off state with various sizes, loading states, and disabled options.
 *
 * @param {object} props - Switcher component props.
 * @param {boolean} [props.value] - Initial state of the switch (on or off).
 * @param {Function} [props.onChange] - Callback function that gets called when the switch is toggled. It receives the new state as an argument.
 * @param {boolean} [props.disabled] - If true, the switch will be disabled and not clickable.
 * @param {boolean} [props.loading] - If true, the switch will show a loading indicator instead of its normal state.
 * @param {LoadingProps} [props.loadingType] - Type of loading indicator: 'simple' , 'cutoff' or 'elastic'.
 * @param {SizeTypes} [props.size] - Size of the switch. Options are 'small', 'medium', or 'large'.
 *
 * @returns {React.ReactNode} Rendered Switcher component.
 *
 * @version 0.4.0
 * @see https://www.npmjs.com/package/djuno-design#switcher
 *
 * @example
 * // Example usage of Switcher component:
 * <Switcher
 *   value={true}
 *   onChange={(value) => console.log('Switch is now:', value)}
 *   disabled={false}
 *   size="medium"
 *   loading={false}
 * />
 */
const Switcher: React.FC<SwitcherProps> = ({ value, onChange, disabled, size, loading, loadingType }) => {
  const [enabled, setEnabled] = useState<boolean>(value || false)

  useEffect(() => {
    setEnabled(value || false)
  }, [value])

  const handleChange = (v: boolean) => {
    if (!disabled && !loading) {
      onChange && onChange(v)
    }
  }
  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
        {
          'h-[17px] w-[33px] border': size === 'small',
          'h-[24px] w-[46px] border-2': size === 'medium' || size === undefined,
          'h-[31px] w-[59px] border-[3px]': size === 'large',
          'bg-primary-400 dark:bg-primary-500': enabled && !disabled,
          'bg-primary-200 dark:bg-primary-200/70': enabled && disabled,
          'bg-gray-200 dark:bg-gray-600': !enabled,
          '!cursor-not-allowed': disabled || loading,
        },
      )}
    >
      <span
        aria-hidden='true'
        className={cn(
          'pointer-events-none inline-block  transform rounded-full bg-white dark:bg-dark-2 shadow-lg ring-0 transition duration-200 ease-in-out',
          'flex items-center justify-center',
          {
            'h-[15px] w-[15px]': size === 'small',
            'h-[20px] w-[20px]': size === 'medium' || size === undefined,
            'h-[25px] w-[25px]': size === 'large',
            'translate-x-0': !enabled,
            'translate-x-[16px]': enabled && size === 'small',
            'translate-x-[22px]': enabled && (size === 'medium' || size === undefined),
            'translate-x-[28px]': enabled && size === 'large',
          },
        )}
      >
        {loading && (
          <Loading
            type={loadingType || 'simple'}
            borderSize={size === 'small' ? 1 : 1.5}
            size={size === 'large' ? 18 : 14}
            theme={'primary'}
          />
        )}
      </span>
    </Switch>
  )
}
export default Switcher
