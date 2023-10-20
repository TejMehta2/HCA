import React from 'react'
import { IconsProps } from './Icons.types'
import Image from 'next/image'
import iconMap from './icon-map.generated'

const Icons = (props: IconsProps): JSX.Element => {
  const { iconName } = props
  return <Image alt="" src={iconMap.get(iconName) as string} />
}

export default Icons
