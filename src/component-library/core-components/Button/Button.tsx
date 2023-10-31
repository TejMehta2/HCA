import React from 'react'
import { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

const Button = (props: ButtonProps): JSX.Element => {
  const { size, theme, children, onClick } = props

  return (
    <div
      className={[styles.button, styles[size], styles[theme]].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Button
