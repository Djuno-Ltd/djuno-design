import * as React from 'react'
import { Disclosure } from '@headlessui/react'
// import { ReactComponent as ChevronDownIcon } from "./../../assets/icons/chevron-down.svg";
import classNames from 'classnames'
import { PropsWithChildren } from 'react'
// import Loading from "./Loading";

export interface AccordionItem {
  label: string | React.ReactNode
  panel?: string | React.ReactNode
}

export interface AccordionProps extends PropsWithChildren {
  items?: Array<AccordionItem>
  panelClassNames?: string
  loading?: boolean
}

const Accordion: React.FunctionComponent<AccordionProps> = ({ items, panelClassNames, loading }) => {
  return (
    <div className='dj-w-full dj-bg-gray-50 dark:dj-bg-black/10 dj-border dark:dj-border-dark-2 dj-rounded-lg dj-overflow-hidden '>
      {/* {items?.length === 0 && loading && <Loading style={{ minHeight: 100 }} />} */}
      {items?.map((item, i) => (
        <Disclosure key={i}>
          {({ open }) => (
            <>
              <Disclosure.Button className='dj-flex dj-w-full dj-justify-between dj-items-center dj-text-slate-900 dj-bg-white hover:dj-bg-gray-50 dark:dj-text-slate-100 dark:dj-bg-dark-3 dark:hover:dj-bg-black/10 dj-px-2 dj-py-3 md:dj-px-4 md:dj-py-4 dj-text-left dj-text-sm dj-font-medium focus:dj-outline-none dj-focus-visible:ring-0'>
                {item.label}
                {/* {item.panel && (
                  <ChevronDownIcon
                    className={classNames(
                      "h-4 w-4 text-slate-500 dark:text-slate-300 transform transition-transform duration-300",
                      {
                        "rotate-180": open,
                      }
                    )}
                  />
                )} */}
              </Disclosure.Button>
              {item.panel && (
                <Disclosure.Panel
                  className={classNames(panelClassNames, {
                    'dj-p-3 dj-border-y dark:dj-border-dark-2 dark:dj-text-slate-200': panelClassNames === undefined,
                  })}
                >
                  {item.panel}
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
export default Accordion
