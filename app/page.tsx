'use client'
import { Election, allElections } from 'contentlayer/generated'
import Main from './Main'
import { useQuery } from 'react-query'
import { getElections } from 'client/elections'

export default function Page() {
  const { data: elections } = useQuery({
    queryKey: ['elections'],
    queryFn: () => getElections(),
  })

  return <Main posts={elections?.data || []} />
}
