import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { createDb } from './db.js'
import { Blog } from './blog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const db = createDb(join(__dirname, 'data.sqlite'))
  const blog = new Blog(db)
  await blog.initialize()

  const posts = await blog.getPosts()
  if (posts.length === 0) {
    console.log('No post available. Run `node import-posts.js' + ' to load some posts')
  }

  for (const post of posts) {
    console.log(post.title)
    console.log('-'.repeat(post.title.length))
    console.log(`Published on ${new Date(post.created_at).toISOString()}`)
    console.log(post.content)
  }
}

main().catch(console.err)