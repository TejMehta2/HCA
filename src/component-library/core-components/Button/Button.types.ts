import { ReactNode } from 'react'

type ButtonSizeUnionTypes = 'small' | 'large'
type ButtonThemeUnionTypes =
  | 'full-dark'
  | 'full-light'
  | 'outline-dark'
  | 'outline-light'
  | 'full-light-blue'
  | 'social-light'
  | 'social-dark'
  | 'standard-carousel-light'
  | 'standard-carousel-dark'
  | 'hover-carousel'

export interface ButtonProps {
  size?: ButtonSizeUnionTypes
  theme?: ButtonThemeUnionTypes
  children?: ReactNode | JSX.Element
  onClick?: React.MouseEventHandler<HTMLDivElement>
  loading?: boolean
}
