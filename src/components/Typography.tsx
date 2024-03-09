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
import cn from '../utils/cn'
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

/**
 * Define Typographt variants using the `cva` utility function.
 * This function generates CSS classes for text styles based on specified variants.
 */
const textVariants = cva('', {
  variants: {
    uiType: {
      default: 'dj-text-black/85',
      secondary: 'dj-text-secondary-500/85 dark:dj-text-secondary-400/85',
      success: 'dj-text-success/85',
      warning: 'dj-text-warning/85',
      danger: 'dj-text-error/85',
      disabled: 'dj-cursor-not-allowed dj-text-black/20',
    },
    link: {
      default: 'dj-text-primary-300 hover:dj-text-primary-500 dj-transition-colors dj-duration-200',
      otherUi: ' dj-transition-colors dj-duration-200',
    },
    size: {
      xs: 'dj-text-xs',
      sm: 'dj-text-sm',
      base: 'dj-text-base',
      lg: 'dj-text-lg',
      xl: 'dj-text-xl',
      '2xl': 'dj-text-2xl',
      '3xl': 'dj-text-3xl',
      '4xl': 'dj-text-4xl',
      '5xl': 'dj-text-5xl',
      '6xl': 'dj-text-6xl',
      '7xl': 'dj-text-7xl',
      '8xl': 'dj-text-8xl',
      '9xl': 'dj-text-9xl',
    },
    level: {
      h1: 'dj-mb-4 dj-text-4xl',
      h2: 'dj-mb-3 dj-text-3xl',
      h3: 'dj-mb-3 dj-text-2xl',
      h4: 'dj-mb-2 dj-text-xl',
      h5: 'dj-mb-2 dj-text-base',
      h6: 'dj-mb-1 dj-text-sm',
    },
  },
  compoundVariants: [
    {
      uiType: ['secondary', 'success', 'warning', 'danger'],
      link: 'otherUi',
      className: 'dj-opacity-80 hover:dj-opacity-95 dj-cursor-pointer',
    },
  ],
  defaultVariants: {
    uiType: 'default',
    size: 'base',
  },
})

/**
 * Typography component ...
 *
 *
 * @returns {React.ReactNode} Rendered Typography component.
 *
 * @version 0.1.0
 * @see https://www.npmjs.com/package/djuno-design#typography
 *
 */
// eslint-disable-next-line react/prop-types
const Typography: React.FC<TypographyProps> & TypographyComponents = ({ children }): React.ReactNode => {
  return <article>{children}</article>
}

const Base: React.FC<TypographyBaseProps> = ({ children, code, mark, underline, del, strong, italic }) => {
  let content = children

  // if (tooltip) {
  //   content = <Tooltip {...tooltip}>{content}</Tooltip>
  // }

  if (code) {
    content = (
      <code className='dj-mx-0 dj-my-1 dj-bg-secondary-100 dj-border dj-rounded dj-px-1 dj-py-0.5'>{content}</code>
    )
  }

  if (mark) {
    content = <mark className='dj-p-0 dj-bg-[#ffe58f]'>{content}</mark>
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
        className={cn('dj-font-semibold', textVariants({ uiType, level: `h${level}` }), className)}
        {...htmlProps}
      >
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
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
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <span {...props} className={cn(textVariants({ uiType, size }), className)}>
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
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
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <div {...props} className={cn(textVariants({ uiType, size }), className)}>
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
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
  ...props
}) => {
  return (
    <Tooltip {...tooltip}>
      <a {...props} className={cn(textVariants({ uiType, link: uiType ? 'otherUi' : 'default', size }), className)}>
        <Base code={code} mark={mark} underline={underline} del={del} strong={strong} italic={italic}>
          {children}
        </Base>
      </a>
    </Tooltip>
  )
}

Typography.Title = Title
Typography.Text = Text
Typography.Paragraph = Paragraph
Typography.Link = Link

export default Typography
