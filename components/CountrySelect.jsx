import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { useCountry } from '../context/CountryContext'
import { useComponentFocus } from '../hooks/useComponentFocus'

const countries = ['AR', 'US', 'ES', 'BR', 'UY', 'CL', 'JP']

const CountrySelect = () => {
  const containerRef = useRef(undefined)
  const { focus: listFocus } = useComponentFocus(containerRef)
  const [showList, setShowList] = useState(true)
  const { selectedCountry, setSelectedCountry } = useCountry()

  useEffect(() => {
    if (!listFocus) setShowList(false)
  }, [listFocus])

  return (
    <div ref={containerRef} className="z-20 self-end m-2">
      <div
        key={selectedCountry}
        className="z-10 relative bg-white flex w-24 h-[56px] pl-2 gap-2 border-b-2 cursor-pointer items-center justify-items-center"
        onClick={() => setShowList(!showList)}
      >
        <Image
          width={30}
          height={20}
          src={`https://countryflagsapi.com/png/${selectedCountry}`}
          alt={`${selectedCountry} flag`}
          className="rounded"
        />
        <span>{selectedCountry}</span>
        <div
          className={`text-xl -mb-[1px] font-bold transition-transform duration-300 ${
            showList ? '-rotate-90' : 'rotate-90'
          }`}
        >
          {'>'}
        </div>
      </div>
      {countries.map((code, index) => (
        <div
          key={code}
          onClick={() => setSelectedCountry(code)}
          className={`absolute top-0 bg-white flex w-24 h-[56px] pl-2 gap-2 border-b-2 cursor-pointer items-center justify-items-center transition-all duration-500 ease-in-out`}
          style={
            showList
              ? {
                  transform: `translateY(${56 * (index + 1)}px)`,
                  transitionDelay: `${index}00ms`,
                  zIndex: `-${index}`
                }
              : {
                  transitionDelay: `${countries.length - index}00ms`,
                  zIndex: `-${index}`
                }
          }
        >
          <div className="relative shadow-md w-[30px] h-[20px] rounded overflow-hidden">
            <Image
              layout="fill"
              src={`https://countryflagsapi.com/png/${code}`}
              alt={`${code} flag`}
            />
          </div>
          <span className={`${code === selectedCountry ? 'font-bold' : ''}`}>
            {code}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CountrySelect