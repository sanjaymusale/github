import React from 'react'
import { GIST } from '../../constants/url'
import ListAll from './list-all'

export default function Starred() {
  return <ListAll url={`${GIST}/starred`} />
}