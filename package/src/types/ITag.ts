export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
  color?: PresetColorNames | string
  style?: React.CSSProperties
  icon?: React.ReactNode
  bordered?: boolean
  closable?: boolean
  onClose?: () => void
}

export type PresetColorNames = 'processing' | 'success' | 'error' | 'warning'
