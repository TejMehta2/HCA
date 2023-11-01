import React from 'react'
import { TextButtonProps } from './TextButton.types'
import styles from './TextButton.module.scss'

const TextButton = (props: TextButtonProps): JSX.Element => {
  const { children } = props
  return <div className={styles['text-button']}>{children}</div>
}

export default TextButton
