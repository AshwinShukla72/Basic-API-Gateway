import type { FC } from 'hono/jsx'

const Layout: FC = (props) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  )
}
type Blog = {
  url: string,
  id: string,
  heading: string,
  body: string,
  ogImg: string,
  authorDetails: {
    name: string, 
    bio: string,
    authorId: string
  }
}
const Blogs: FC<{ blogs: Blog[] }> = (props: { blogs: Blog[] }) => {
  return (
    <Layout>
      <div>
        <h1 style={{ fontFamily: 'JetBrains Mono, monospace' }}>Welcome to Blogs</h1>
        <div>
          {props.blogs.map(blog => (
            <div key={blog.id} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <h4>{blog.heading}</h4>
              <img src={blog.ogImg} alt="Blog thumbnail" />
              <p>{blog.body}</p> 
              <p>Author: {blog.authorDetails.name}</p>
              <p>Bio: {blog.authorDetails.bio}</p>
              <a href={blog.url}>Read more</a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
export default Blogs