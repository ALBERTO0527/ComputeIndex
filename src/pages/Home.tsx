import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Stats from '../components/Stats'
import IndexSection from '../components/IndexSection'
import ComputeMap from '../components/map/ComputeMap'
import Streams from '../components/Streams'
import UseCases from '../components/UseCases'
import FreeTier from '../components/FreeTier'
import Cta from '../components/Cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <div className="py-24">
        <Stats />
      </div>
      <IndexSection />
      <ComputeMap />
      <Streams />
      <UseCases />
      <FreeTier />
      <Cta />
    </>
  )
}
