import React from 'react'
import AceEditor from 'react-ace';
import "brace/mode/javascript";
import "brace/mode/text";
import "brace/mode/json";
import "brace/mode/ruby";
import "brace/theme/xcode";
import PropTypes from 'prop-types'
import { getExtension } from '../helper'

export default function Editor(props) {
  const { file, ...rest } = props
  const ext = getExtension([file])
  // console.log(ext)
  return (
    <AceEditor
      mode={ext || "text"}
      theme="xcode"
      {...rest}
    />
  )
}


Editor.propTypes = {
  file: PropTypes.string.isRequired,


}

