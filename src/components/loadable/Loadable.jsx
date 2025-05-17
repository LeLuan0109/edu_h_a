import { Suspense } from 'react'
import Loading from '~/components/loading/Loading.jsx'
const Loadable = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}

export default Loadable