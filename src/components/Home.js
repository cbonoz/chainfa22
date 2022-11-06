import React, {useState, } from 'react'
import { Button,  Spin, Row, Col } from 'antd';
import { APP_DESC} from '../constants';
import { useNavigate } from 'react-router';
import hero from './../assets/logo_3_2.png'

export const Home = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState()

    return  <div className='home-section'>
      <Row className='home-section'>
        <Col span={12}>
        <div className='prompt-section'>
          {APP_DESC}
      </div>
      <div>
          <Button className='standard-btn' size="large" type="primary" onClick={() => navigate('/create')}>
            Track your first parcel
          </Button>
      </div>
        </Col>
        <Col span={12}>
          <img src={hero}/>
        </Col>
      </Row>
           
    </div>

}