'use client'

import { performVote } from 'client/elections'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page({ params }: { params: { slug: string[] } }) {
  const [id, setId] = useState('')
  const [fingerprint, setFingerprint] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await performVote(params.slug, { username: id, password: fingerprint })
      localStorage.setItem('user_data', JSON.stringify({ username: id, password: fingerprint }))
      router.push(`/election/vote/${params.slug}`)
    } catch (error) {
      console.error(error)
      setErrorMessage(error.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Cast Your Vote</h1>
      {isSuccess && (
        <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-500">
          Vote successful!
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-500">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id" className="mb-2 block font-bold text-gray-500">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-500 shadow focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fingerprint" className="mb-2 block font-bold text-gray-500">
            Fingerprint
          </label>
          <input
            type="text"
            id="fingerprint"
            name="fingerprint"
            value={fingerprint}
            onChange={(e) => setFingerprint(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-500 shadow focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  )
}
