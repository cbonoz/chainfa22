import { useSigner } from '@web3modal/react'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { ACTIVE_CHAIN } from '../constants'
import { getRecord } from '../contract'

export default function Lookup() {
  const { data: signer, error: signerError, isLoading } = useSigner({chainId: ACTIVE_CHAIN.id})

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