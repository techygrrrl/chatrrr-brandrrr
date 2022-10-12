import Express from 'express'

const app = Express()

const port = process.env.PORT || 5006

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})