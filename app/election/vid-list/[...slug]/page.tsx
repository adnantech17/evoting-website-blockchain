'use client'

import { getVids } from 'client/elections'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'

export default function Page({ params }: { params: { slug: string[] } }) {
  const verificationIds = ['id1', 'id2', 'id3', 'id4']

  const { data: vids } = useQuery({
    queryKey: ['vids'],
    queryFn: () => getVids(params.slug),
  })

  return (
    <div className="h-screen ">
      <div className="p-6  md:mx-auto">
        <div className="">
          <h3 className="text-base font-semibold md:text-2xl">VID List</h3>
          <ul>
            {vids?.data?.map((id, idx) => (
              <li key={id} className="mt-1 text-gray-500 hover:text-gray-400">
                {idx + 1}. {id}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
