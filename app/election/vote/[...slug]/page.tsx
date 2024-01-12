import Head from 'next/head'
import Image from 'next/image'

const candidates = [
  {
    name: 'Candidate 1',
    image: 'https://picsum.photos/id/237/100/100',
  },
  {
    name: 'Candidate 2',
    image: 'https://picsum.photos/id/91/100/100',
  },
  {
    name: 'Candidate 3',
    image: 'https://picsum.photos/id/64/100/100',
  },
]

export default function VotePage() {
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
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
