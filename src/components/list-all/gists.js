import React from 'react'
import { GIST } from '../../constants/url'
import ListAll from './list-all'

export default function Gists() {
    return <ListAll url={`${GIST}`} />
}