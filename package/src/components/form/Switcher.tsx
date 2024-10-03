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
 * @param {SizeTypes} [props.uiSize] - Size of the switch. Options are 'small', 'medium', or 'large'.
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
const Switcher: React.FC<SwitcherProps> = ({ value, onChange, disabled, uiSize, loading, loadingType }) => {
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
        'dd-relative dd-inline-flex dd-shrink-0 dd-cursor-pointer dd-rounded-full dd-border-transparent dd-transition-colors dd-duration-200 dd-ease-in-out focus:dd-outline-none focus-visible:dd-ring-2 focus-visible:dd-ring-white/75',
        {
          'dd-h-[17px] dd-w-[33px] dd-border': uiSize === 'small',
          'dd-h-[24px] dd-w-[46px] dd-border-2': uiSize === 'medium' || uiSize === undefined,
          'dd-h-[31px] dd-w-[59px] dd-border-[3px]': uiSize === 'large',
          'dd-bg-primary-400 dark:dd-bg-primary-500': enabled && !disabled,
          'dd-bg-primary-200 dark:dd-bg-primary-200/70': enabled && disabled,
          'dd-bg-gray-200 dark:dd-bg-gray-600': !enabled,
          '!dd-cursor-not-allowed': disabled || loading,
        },
      )}
    >
      <span
        aria-hidden='true'
        className={cn(
          'dd-pointer-events-none dd-inline-block  dd-transform dd-rounded-full dd-bg-white dark:dd-bg-dark-2 dd-shadow-lg dd-ring-0 dd-transition dd-duration-200 dd-ease-in-out',
          'dd-flex dd-items-center dd-justify-center',
          {
            'dd-h-[15px] dd-w-[15px]': uiSize === 'small',
            'dd-h-[20px] dd-w-[20px]': uiSize === 'medium' || uiSize === undefined,
            'dd-h-[25px] dd-w-[25px]': uiSize === 'large',
            'dd-translate-x-0': !enabled,
            'dd-translate-x-[16px]': enabled && uiSize === 'small',
            'dd-translate-x-[22px]': enabled && (uiSize === 'medium' || uiSize === undefined),
            'dd-translate-x-[28px]': enabled && uiSize === 'large',
          },
        )}
      >
        {loading && (
          <Loading
            uiType={loadingType || 'simple'}
            borderSize={uiSize === 'small' ? 1 : 1.5}
            uiSize={uiSize === 'large' ? 18 : 14}
            theme={'primary'}
          />
        )}
      </span>
    </Switch>
  )
}
export default Switcher
