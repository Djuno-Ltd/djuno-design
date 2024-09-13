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
 * @param {LoadingProps} [props.loadingSetting] - Configuration for the loading indicator, including size, border size, and type.
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
const Switcher: React.FC<SwitcherProps> = ({ value, onChange, disabled, size, loading, loadingSetting }) => {
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
        'dj-relative dj-inline-flex dj-shrink-0 dj-cursor-pointer dj-rounded-full dj-border-transparent dj-transition-colors dj-duration-200 dj-ease-in-out focus:dj-outline-none focus-visible:dj-ring-2 focus-visible:dj-ring-white/75',
        {
          'dj-h-[17px] dj-w-[33px] dj-border': size === 'small',
          'dj-h-[24px] dj-w-[46px] dj-border-2': size === 'medium' || size === undefined,
          'dj-h-[31px] dj-w-[59px] dj-border-[3px]': size === 'large',
          'dj-bg-primary-400 dark:dj-bg-primary-500': enabled && !disabled,
          'dj-bg-primary-200 dark:dj-bg-primary-200/70': enabled && disabled,
          'dj-bg-gray-200 dark:dj-bg-gray-600': !enabled,
          '!dj-cursor-not-allowed': disabled || loading,
        },
      )}
    >
      <span
        aria-hidden='true'
        className={cn(
          'dj-pointer-events-none dj-inline-block  dj-transform dj-rounded-full dj-bg-white dark:dj-bg-dark-2 dj-shadow-lg dj-ring-0 dj-transition dj-duration-200 dj-ease-in-out',
          'dj-flex dj-items-center dj-justify-center',
          {
            'dj-h-[15px] dj-w-[15px]': size === 'small',
            'dj-h-[20px] dj-w-[20px]': size === 'medium' || size === undefined,
            'dj-h-[25px] dj-w-[25px]': size === 'large',
            'dj-translate-x-0': !enabled,
            'dj-translate-x-[16px]': enabled && size === 'small',
            'dj-translate-x-[22px]': enabled && (size === 'medium' || size === undefined),
            'dj-translate-x-[28px]': enabled && size === 'large',
          },
        )}
      >
        {loading && (
          <Loading
            size={loadingSetting?.size || 13}
            borderSize={loadingSetting?.borderSize || 2}
            type={loadingSetting?.type || 'elastic'}
          />
        )}
      </span>
    </Switch>
  )
}
export default Switcher
