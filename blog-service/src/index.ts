import { Hono } from 'hono'
import { logger } from "hono/logger"

import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid'
import { HTTPException } from "hono/http-exception";

const app = new Hono({ strict: true }).basePath("api");
app.use("*", logger())

const generateRandomData = () => {
  const fakeUrl = faker.internet.url({ protocol: 'http', appendSlash: false })
  return {
    url: `${fakeUrl}/${nanoid()}`,
    id: nanoid(),
    heading: faker.lorem.lines(1),
    body: `<p>${faker.lorem.paragraphs(3, '<br/>\n')}</p>`,
    ogImg: `${fakeUrl}/images/${nanoid()}.jpg`,
    authorId: uuidv4(),
  }
}

app.get('/blogs', async (c) => {
  try {
    const count = 10
    const blogs = []
    for (let index = 0; index < count; index++) {
      blogs.push(generateRandomData())
    }
    return c.json({blogs, count: blogs.length}, 200)
  } catch (error) {
    throw new HTTPException(500, { message: "Something went wrong" })
  }
})

console.log(`Server started at PORT: ${Bun.env.PORT}`)

Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT || 3031
})
