import axios from 'axios'

export async function getData(url) {
  let data = 'sanjay'
  await axios.get(url)
    .then((res) => {
      data = res.data
    })
  return data
}