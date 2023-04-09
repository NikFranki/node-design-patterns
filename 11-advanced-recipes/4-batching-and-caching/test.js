import superagent from 'superagent'

for (let i = 0; i < 100; i++) {
  console.log(i)
  superagent.get('http://localhost:8000?product=app', (err, res) => {
    console.log(res.body)
  })
}