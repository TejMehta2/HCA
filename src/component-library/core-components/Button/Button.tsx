import React from 'react'
import { ButtonProps } from './Button.types'
import styles from './Button.module.scss'

const Button = (props: ButtonProps): JSX.Element => {
  const { size, theme, children, loading, onClick } = props

  return (
    <div
      className={[
        styles.button,
        styles[size],
        styles[theme],
        styles[loading ? 'loading' : ''],
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Button
