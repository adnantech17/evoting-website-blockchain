'use client'

import { performVote } from 'client/elections'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const candidates = [
  {
    id: 0,
    name: 'Candidate 1',
    image: 'https://picsum.photos/id/237/100/100',
  },
  {
    id: 1,
    name: 'Candidate 2',
    image: 'https://picsum.photos/id/91/100/100',
  },
  {
    id: 2,
    name: 'Candidate 3',
    image: 'https://picsum.photos/id/64/100/100',
  },
  {
    id: 3,
    name: 'Candidate 4',
    image: 'https://picsum.photos/id/219/100/100',
  },
  {
    id: 4,
    name: 'Candidate 5',
    image: 'https://picsum.photos/id/453/100/100',
  },
]

export default function VotePage({ params }: { params: { slug: string[] } }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleVote = async (id) => {
    setIsLoading(true)
    try {
      const response = await performVote(params.slug, {
        ...JSON.parse(localStorage.getItem('user_data') || '{}'),
        id,
      })
      localStorage.setItem('vid', response.data.vid)
      router.push(`/election/vote-success/${params.slug}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Vote Page</title>
      </Head>
      <h1 className="mb-4 text-2xl font-bold">Cast Your Vote</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {candidates.map((candidate) => (
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
            <button
              onClick={() => handleVote(candidate.id)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
