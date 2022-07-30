const { setupServer } = require('msw/node')
const { rest } = require('msw')

const server = setupServer(
  rest.get('https://api.backend.dev/user', (_, res, ctx) => (
    res(ctx.json({ firstName: 'Federico' }))
  ))
)

console.info('Mock server ready')

process.once("SIGINT", server.close)
process.once("SIGTERM", server.close)
