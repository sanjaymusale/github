import React from 'react'
import { GIST } from '../../constants/url'
import ListAll from './list-all-hook'

export default function Gists(props) {
    return <ListAll url={`${GIST}`} {...props} />
}