'use client'

import { getElectionDetails } from 'client/elections'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

const candidates = [
  {
    name: 'Candidate 1',
    image: 'https://picsum.photos/id/237/100/100',
    votes: '10',
  },
  {
    name: 'Candidate 2',
    image: 'https://picsum.photos/id/91/100/100',
    votes: '2',
  },
  {
    name: 'Candidate 3',
    image: 'https://picsum.photos/id/64/100/100',
    votes: '3',
  },
  {
    name: 'Candidate 4',
    image: 'https://picsum.photos/id/64/100/100',
    votes: '0',
  },
  {
    name: 'Candidate 5',
    image: 'https://picsum.photos/id/64/100/100',
    votes: '1',
  },
]

export default function Page({ params }: { params: { slug: string[] } }) {
  const { data: election } = useQuery({
    queryKey: ['election'],
    queryFn: () => getElectionDetails(params.slug),
  })

  const [countdown, setCountdown] = useState({ days: 0, minutes: 0, hours: 0, seconds: 0 })

  useEffect(() => {
    const calculateCountdown = () => {
      const electionDate = new Date(election?.data?.election?.start_date)
      const now = new Date()
      const difference = electionDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    calculateCountdown()
    const intervalId = setInterval(calculateCountdown, 1000)

    return () => clearInterval(intervalId)
  }, [election?.data?.election?.start_date])

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">{election?.data?.election?.title}</h1>
      <p className="mb-4">{election?.data?.election?.description}</p>
      {countdown.seconds >= 0 ? (
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-bold">Countdown:</div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-gray-600 px-4 py-2">{countdown.days}d</span>
            <span className="rounded-full bg-gray-600 px-4 py-2">{countdown.hours}h</span>
            <span className="rounded-full bg-gray-600 px-4 py-2">{countdown.minutes}m</span>
            <span className="rounded-full bg-gray-600 px-4 py-2">{countdown.seconds}s</span>
          </div>
        </div>
      ) : (
        <div>
          {dayjs(election?.data?.election?.end_date).isBefore(dayjs()) &&
            election?.data?.vote_count && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="m-4 text-2xl font-bold">Result</h1>
                  <Link
                    className="h-9 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    href={`/election/vid-list/${params.slug}`}
                  >
                    VID List
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {candidates.map((candidate, idx: number) => (
                    <div
                      key={candidate.name}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={candidate.image}
                          alt={candidate.name}
                          width={100}
                          height={100}
                          className="mb-4 rounded-full"
                        />
                        <h3 className="text-lg font-bold">{candidate.name}</h3>
                      </div>
                      <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                        {election?.data?.vote_count?.[idx]} Votes
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          {!election?.data?.vote_count && (
            <div className="mt-5 flex items-center justify-between">
              {!dayjs(election?.data?.election?.end_date).isBefore(dayjs()) ? (
                <Link
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  href={`/election/verify/${params.slug}`}
                >
                  Go to Vote Page
                </Link>
              ) : (
                <>
                  <Link
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    href={`/election/submit-key/${params.slug}`}
                  >
                    Submit Key
                  </Link>
                  <Link
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    href={`/election/get-key/${params.slug}`}
                  >
                    Get Key
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
