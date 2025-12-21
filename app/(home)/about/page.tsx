import React, { Suspense } from 'react'
import AboutView from '../../../modules/about/ui/view/about-view'

const AboutPage = () => {
  return (
	<Suspense fallback={<div>Loading...</div>}>
	<AboutView/>
	</Suspense>
  )
}

export default AboutPage