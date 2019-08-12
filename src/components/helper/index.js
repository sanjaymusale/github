export const Extensions = {
  'js': 'javascript',
  'java': 'java',
  'rb': 'ruby',
  'json': 'json',
  'html': 'html',
}

export const getExtension = (str) => {
  const ext = str[0].split('.')[1]
  // console.log(ext)
  const type = Extensions[ext]
  return type
}