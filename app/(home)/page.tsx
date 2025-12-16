import Loader from '@/components/loading'
import { HomeView } from '@/modules/home/ui/views/home-view'
import { Suspense } from 'react'

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <HomeView/>
    </Suspense>
  )
}

export default Home