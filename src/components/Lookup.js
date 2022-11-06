import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { getRecord } from '../contract'

export default function Lookup() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [parcel, setParcel] = useState()
  const [record, setRecord] = useState()

  const params = useParams()
  const {itemId} = params

  function clear() {
    setLoading(false)
    setError(undefined)
    setRecord(undefined)
  }

  async function getInfo() {
    setError()
    setLoading(true)
    try {

      const {data} = await getRecord(itemId)
      setParcel(data)
    } catch (e) {
      console.error('error fetching record', e)
      setError(e)
    } finally {
      clear()
    }
  }

  useEffect(() => {
    getInfo()
  }, [itemId])

  return (
    <div>Lookup
      <p>{JSON.stringify(parcel)}</p>

    </div>
  )
}