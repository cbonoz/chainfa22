import { useSigner } from '@web3modal/react'
import { Button, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { ACTIVE_CHAIN } from '../constants'
import { getRecord } from '../contract'
import { ipfsUrl } from '../util'
import { getLocation } from '../util/location'
import { getMetadata } from '../util/stor'
import { FileDrop } from './FileDrop/FileDrop'

export default function Lookup() {
  const { data: signer, error: signerError, isLoading } = useSigner({chainId: ACTIVE_CHAIN.id})

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [parcel, setParcel] = useState()
  const [location ,setLocation] = useState()
  const [data, setData] = useState({files: [], notes: ''})

  const params = useParams()
  const {itemId} = params

  function clear() {
    setLoading(false)
    setError(undefined)
  }

  async function findLocation() {
    try {
      const loc = await getLocation()
      setLocation(loc)
    } catch (e) {
      console.error(e)
    }
  }

  useState(() => {
    findLocation()
  }, [])

  async function recordUpdate() {

  } 

  async function getParcelInfo() {
    setError(undefined)
    setLoading(true)
    try {

      const res = await getMetadata(ipfsUrl(itemId))
      setParcel(res?.data || {})
    } catch (e) {
      console.error('error fetching record', e)
      setError(e)
    } finally {
      clear()
    }
  }

  useEffect(() => {
    getParcelInfo()
  }, [itemId])

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  if (loading) {
    return <Spin size="large"/>
  }

  if (error) {
    return <div className='error-text'>
      {error}
    </div>
  }

  return (
    <div>Lookup
      {parcel && <p>{JSON.stringify(parcel)}</p>}
      {location && JSON.stringify(location)}
      {parcel?.image && <span>
        <h3>Original Image:</h3>
        <img src={parcel.image} />
      </span>}
      <h3 className="vertical-margin">Upload new image of parcel (Optional):</h3>
      <FileDrop
        files={data.files}
        setFiles={(files) => updateData("files", files)}
      />

      <TextArea
              aria-label="Notes"
              onChange={(e) => updateData("notes", e.target.value)}
              placeholder="Add any additional comments or updates"
              prefix="Notes: "
              value={data.notes}
            />

        <br/>
        <br/>
      <Button type="primary" size="large" disabled={loading} loading={loading} onClick={recordUpdate}>
        Submit update
      </Button>

    </div>
  )
}