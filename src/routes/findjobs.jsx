import { createFileRoute } from '@tanstack/react-router'
import FindJobs from '../pages/FindJobs'

export const Route = createFileRoute('/findjobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FindJobs/>
}
