import { env } from './config/env.config'
import app from './setup'

app.listen(env.PORT) // application port goes here
console.log(`📡 Wakey wakey, It's on port ${env.PORT} 📡`)
