import React from 'react'
import { LoaderProps } from './Loader.types'
import styles from './_Loader.module.scss'

const Loader = (props: LoaderProps): JSX.Element => {
  const { theme } = props
  return (
    <span
      className={[
        styles.loader,
        styles[`loader-${theme ? theme : 'light'}`],
      ].join(' ')}
    ></span>
  )
}

export default Loader
