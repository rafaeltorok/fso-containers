const redis = require('redis')
const { REDIS_URL } = require('../util/config')
const { Todo } = require("../mongo")

let set
let get

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  set = redisIsDisabled
  get = redisIsDisabled
} else {
  let client = redis.createClient({
    url: REDIS_URL
  })

  client.on('error', (err) => console.log('Redis Client Error', err))
  
  client.connect().then(async () => {
    console.log('Connected to Redis')
    
    const totalCount = await client.get("added_todos")
    
    if (!totalCount) {
      const total = await Todo.countDocuments()
      await client.set("added_todos", total)
    }
  })
    
  get = (...args) => client.get(...args)
  set = (...args) => client.set(...args)
}

module.exports = {
  get,
  set,
}
