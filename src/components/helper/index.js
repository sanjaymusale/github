const extensions = {
  'js': 'javascript',
  'java': 'java',
  'rb': 'ruby',
  'json': 'json',
  'html': 'html',
}

export const getExtension = (str) => {
  const ext = str[0].split('.')[1]
  // console.log(ext)
  const type = extensions[ext]
  return type
}