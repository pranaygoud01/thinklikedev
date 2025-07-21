import { createFileRoute } from '@tanstack/react-router'
import FreeResources from '../pages/FreeResources'

export const Route = createFileRoute('/freeresources')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FreeResources/>
}
