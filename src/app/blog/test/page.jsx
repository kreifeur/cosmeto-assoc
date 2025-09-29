"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // Essayez directement avec mode 'cors'
                const response = await fetch('https://backend-association-cosm-tologie.vercel.app/api/articles', {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                
                const result = await response.json()
                setData(result)
                console.log('Fetched data:', result)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            <h1>Articles</h1>
            {data && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    )
}

export default Page