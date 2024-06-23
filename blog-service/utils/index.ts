import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid'

export const generateRandomData = () => {
  const fakeUrl = faker.internet.url({ protocol: 'http', appendSlash: false })
  return {
    url: `${fakeUrl}/${nanoid()}`,
    id: nanoid(),
    heading: faker.lorem.lines(1),
    body: `${faker.lorem.paragraphs(3, '<br/>\n')}`,
    ogImg: `${fakeUrl}/images/${nanoid()}.jpg`,
    authorDetails: {
      name: faker.person.fullName(),
      bio: faker.person.bio(),
      authorId: uuidv4(),
    }
  }
}