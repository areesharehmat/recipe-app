import React from 'react'

const Hero = () => {
  return (
    <>
            {/* <!-- Hero --> */}
    <section className="bg-pink-700 py-20 mb-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            Desert Recipies
          </h1>
          <p className="my-4 text-xl text-white">
            Minimal effort and a sweet reward
          </p>
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero