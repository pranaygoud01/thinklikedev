import { createFileRoute } from '@tanstack/react-router'
import SingleBlog from '../../pages/SingleBlog'

export const Route = createFileRoute('/blog/$id')({
  component: SingleBlog,
})
