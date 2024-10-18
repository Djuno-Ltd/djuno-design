/**
 * @author Ansar Mirzayi <ansarmirzayi@gmail.com>
 * @fileoverview Typography Component
 * @copyright Djuno Design 2024
 *
 * Copyright 2024 Djuno Design
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react'
import { cn } from '../utils/cn'
import { cva } from 'class-variance-authority'
import {
  TypographyBaseProps,
  TypographyComponents,
  TypographyLinkProps,
  TypographyParagraphProps,
  TypographyProps,
  TypographyTextProps,
  TypographyTitleProps,
} from '../types/Typography'
import Tooltip from './Tooltip'
import { ReactComponent as CopyIcon } from './../assets/icons/copy.svg'
import { ReactComponent as CheckIcon } from './../assets/icons/check.svg'
import { CopyableOptionsProp, CopyableText } from '../types'
import { useCopyable } from '../hooks/useCopyable'

/**
 * Define Typographt variants using the `cva` utility function.
 * This function generates CSS classes for text styles based on specified variants.
 */
const textVariants = cva('', {
  variants: {
    uiType: {
      default: 'dd-text-black/85 dark:dd-text-secondary-100',
      secondary: 'dd-text-secondary-500/85 dark:dd-text-secondary-400/85',
      success: 'dd-text-success/85',
      warning: 'dd-text-warning/85',
      danger: 'dd-text-error/85',
      disabled: 'dd-cursor-not-allowed dd-text-black/20 dark:dd-text-dark-100/30',
      transparent: '',
    },
    link: {
      default:
        'dd-text-primary-300 hover:dd-text-primary-500 dark:dd-text-primary-300 dark:hover:dd-text-primary-500 dd-transition-colors dd-duration-200',
      otherUi: ' dd-transition-colors dd-duration-200',
    },
    size: {
      xs: 'dd-text-xs',
      sm: 'dd-text-sm',
      base: 'dd-text-base',
      lg: 'dd-text-lg',
      xl: 'dd-text-xl',
      '2xl': 'dd-text-2xl',
      '3xl': 'dd-text-3xl',
      '4xl': 'dd-text-4xl',
      '5xl': 'dd-text-5xl',
      '6xl': 'dd-text-6xl',
      '7xl': 'dd-text-7xl',
      '8xl': 'dd-text-8xl',
      '9xl': 'dd-text-9xl',
    },
    level: {
      h1: 'dd-mb-4 dd-text-4xl',
      h2: 'dd-mb-3 dd-text-3xl',
      h3: 'dd-mb-3 dd-text-2xl',
      h4: 'dd-mb-2 dd-text-xl',
      h5: 'dd-mb-2 dd-text-base',
      h6: 'dd-mb-1 dd-text-sm',
    },
  },
  compoundVariants: [
    {
      uiType: ['secondary', 'success', 'warning', 'danger'],
      link: 'otherUi',
      className: 'opacity-80 hover:opacity-95 cursor-pointer',
    },
  ],
  defaultVariants: {
    uiType: 'default',
    size: 'base',
  },
})

/**
 * Typography component that renders various types of text elements such as titles, paragraphs, and links.
 * It allows customization through props like code, mark, underline, delete, strong, and italic.
 *
 * @param {object} props - Typography props.
 * @param {React.ReactNode} props.children - The content to be displayed within the Typography component.
 * @param {TypographtUiTypes} [props.uiType] - The UI type to determine the text's appearance (e.g., secondary, success, warning, etc.).
 * @param {boolean} [props.code] - Determines if the content should be displayed as code.
 * @param {boolean} [props.mark] - Determines if the content should be highlighted.
 * @param {boolean} [props.underline] - Determines if the content should be underlined.
 * @param {boolean} [props.del] - Determines if the content should be struck through.
 * @param {boolean} [props.strong] - Determines if the content should be displayed as strong.
 * @param {boolean} [props.italic] - Determines if the content should be displayed in italics.
 * @param {object} [props.tooltip] - Additional props for the tooltip functionality.
 * @param {boolean | TypographyCopyableProp} [props.copyable] - Determines if the content should be copyable, with optional copyable configurations.
 *
 * @returns {React.ReactNode} Rendered Typography component.
 *
 * @version 0.1.0
 * @see https://www.npmjs.com/package/djuno-design#typography
 *
 * @example
 * // Example usage of Typography component:
 * <Typography>
 *   <Typography.Title>Sample Title</Typography.Title>
 *   <Typography.Paragraph>
 *     This is a sample paragraph with <Typography.Link>link</Typography.Link>.
 *   </Typography.Paragraph>
 *   <Typography.Text>
 *     This is a sample text with <strong>strong</strong> and <i>italic</i> formatting.
 *   </Typography.Text>
 * </Typography>
 */
// eslint-disable-next-line react/prop-types
const Typography: React.FC<TypographyProps> & TypographyComponents = ({ children }): React.ReactNode => {
  return <article>{children}</article>
}

const Base: React.FC<TypographyBaseProps> = ({ children, code, mark, underline, del, strong, italic }) => {
  let content = children

  if (code) {
    content = (
      <code className='dd-mx-0 dd-my-1 dd-bg-secondary-100 dark:dd-bg-dark-700 dd-border dark:dd-border-dark-500 dd-rounded dd-px-1 dd-py-0.5'>
        {content}
      </code>
    )
  }

  if (mark) {
    content = <mark className='dd-p-0 dd-bg-[#ffe58f]'>{content}</mark>
  }

  if (underline) {
    content = <u>{content}</u>
  }

  if (del) {
    content = <del>{content}</del>
  }

  if (strong) {
    content = <strong>{content}</strong>
  }

  if (italic) {
    content = <i>{content}</i>
  }

  return content
}

const Title: React.FC<TypographyTitleProps> = ({
  children,
  level = 1,
  className,
  uiType,
  tooltip,
  code,
  mark,
  underline,
  del,
  strong,
  italic,
  copyable,
  ...props
}) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements

  // Filter out SVG-specific props
  const htmlProps: { [key: string]: unknown } = {}
  for (const [key, value] of Object.entries(props)) {
    if (!key.startsWith('on') && key !== 'xmlns' && key !== 'viewBox') {
      htmlProps[key] = value
    }
  }

  return (
    <Tooltip {...tooltip}>
      <Heading
        className={cn('dd-font-semibold', textVariants({ uiType, level: `h${level}` }), className)}
        {...htmlProps}
      >
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
          {copyable && <CopyableText copyable={copyable} textChildren={children} />}
        </Base>
      </Heading>
    </Tooltip>
  )
}

const Text: React.FC<TypographyTextProps> = ({
  children,
  className,
  uiType,
  size,
  tooltip,
  code,
  mark,
  underline,
  del,
  strong,
  italic,
  copyable,
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <span {...props} className={cn(textVariants({ uiType, size }), className)}>
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
          {copyable && <CopyableText copyable={copyable} textChildren={children} />}
        </Base>
      </span>
    </Tooltip>
  )
}

const Paragraph: React.FC<TypographyParagraphProps> = ({
  children,
  className,
  uiType,
  size,
  tooltip,
  code,
  mark,
  underline,
  del,
  strong,
  italic,
  copyable,
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <div {...props} className={cn(textVariants({ uiType, size }), className)}>
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
          {copyable && <CopyableText copyable={copyable} textChildren={children} />}
        </Base>
      </div>
    </Tooltip>
  )
}

const Link: React.FC<TypographyLinkProps> = ({
  children,
  className,
  uiType,
  size,
  tooltip,
  code,
  mark,
  underline,
  del,
  strong,
  italic,
  copyable,
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <a {...props} className={cn(textVariants({ uiType, link: uiType ? 'otherUi' : 'default', size }), className)}>
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
          {copyable && <CopyableText copyable={copyable} textChildren={children} />}
        </Base>
      </a>
    </Tooltip>
  )
}

const CopyableText: React.FC<{ copyable: boolean | CopyableOptionsProp; textChildren: React.ReactNode }> = ({
  copyable,
  textChildren,
}) => {
  const { copy, icon, tooltipText, textToCopy } = useCopyable({ copyable })

  const text: string = React.useMemo(() => {
    if (
      copyable &&
      typeof copyable !== 'undefined' &&
      typeof copyable !== 'boolean' &&
      typeof copyable.text !== 'undefined'
    ) {
      return copyable.text
    } else {
      if (typeof textChildren !== 'undefined' && textChildren !== null) {
        return textChildren.toString()
      } else {
        return ''
      }
    }
  }, [])

  const handleCopy = () => {
    let finalText: CopyableText = ''
    if (textToCopy) {
      if (typeof textToCopy === 'function') {
        finalText = textToCopy({ value: text })
      } else {
        finalText = textToCopy
      }
    } else {
      finalText = text
    }
    copy(finalText)
  }

  return (
    <div className='dd-inline-block dd-ms-1 dd-text-sm'>
      <Tooltip content={tooltipText}>
        <span className='dd-inline-flex dd-items-center dd-text-inherit dd-h-full dd-w-full'>
          <span
            onClick={handleCopy}
            className='dd-cursor-pointer dd-transition-all dd-duration-300 dd-text-primary-500 hover:dd-text-primary-600 dd-w-4 dd-aspect-square'
          >
            {icon}
          </span>
        </span>
      </Tooltip>
    </div>
  )
}

Typography.Title = Title
Typography.Text = Text
Typography.Paragraph = Paragraph
Typography.Link = Link

export default Typography
