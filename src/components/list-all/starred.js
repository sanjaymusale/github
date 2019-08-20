import React from 'react'
import { GIST } from '../../constants/url'
import ListAll from './list-all-hook'

export default function Starred(props) {
  return <ListAll url={`${GIST}/starred`} {...props} />
}