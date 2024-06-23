import { Hono } from 'hono'
import { logger } from "hono/logger"
import { etag } from "hono/etag"
import { HTTPException } from "hono/http-exception";
import Top from '../pages/blogs';
import { generateRandomData } from '../utils';
const app = new Hono({ strict: true }).basePath("api");
app.use("*", logger())



app.get('/blogs*', async (c) => {
  try {
    const count = 10
    const blogs = []
    for (let index = 0; index < count; index++) {
      blogs.push(generateRandomData())
    }
    return c.html(<Top blogs={blogs} />)
  } catch (error) {
    throw new HTTPException(500, { message: "Something went wrong" })
  }
})

export default app