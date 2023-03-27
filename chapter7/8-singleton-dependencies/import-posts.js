import { Blog } from './blog.js'

const posts = [
  {
    id: 'my-first-post',
    title: 'My first post',
    content: 'Hello World!\nThis is my first post',
    created_at: new Date('2023-03-27')
  }
]

async function main() {
  const blog = new Blog()
  await blog.initialize()

  await Promise.all(
    posts.map(
      (post) => blog.createPost(
        post.id,
        post.title,
        post.content,
        post.created_at
      )
    )
  )
  console.log('All posts imported')
}

main().catch(console.err)