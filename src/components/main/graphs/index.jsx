import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message,Row } from 'antd';
import './index.css';
import BootomGraphs from './bootomGraphs';


const DemoLine = () => {
  const [data, setData] = useState([]);
  const [mon,setMon] = useState(5);
  const [writes,setWrites] = useState("May - June 2023");

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e.key);
  };


  const items = [
    {
      label: 'May - June 2023',
      key: '5',
      icon: <UserOutlined />,
    },
    {
      label: 'April - May 2023',
      key: '4',
      icon: <UserOutlined />,
    },
    {
      label: 'March - April 2023',
      key: '3',
      icon: <UserOutlined />,
    },
  
  ];
  const handleMenuClick = (e) => {
    setMon(e.key)
  
    
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  const desiredItem = items.find(item => item.key === mon);
  
 
  
  useEffect(() => {
    calcpoint();
    if (desiredItem) {
      const desiredLabel = desiredItem.label;
      setWrites(desiredLabel); // Output: 'May - June 2023'
    } else {
      console.log('Item not found.');
    }
  }, [mon]);

  const calcpoint = async () => {
    const respons = await fetch(`https://board-g5rs.onrender.com/${mon}`, {
        method: "GET",
    });
    
    const user = await respons.json();
    setData(user);
}
  const config = {
    data,
    xField: 'name',
    yField: 'value',
    seriesField: 'category',
    
    legend: {
      position: 'top-right',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    color: ['#9BDD7C', '#E9A0A0'],
    
  };

  return (
  <>
  <div className="overall">
    <Row className='ris' >
    
    <h2>Activities</h2>
    <Dropdown.Button menu={menuProps}  style={{marginTop:'1rem'}}>
      <span style={{display:'inline'}}>{writes}</span>
    </Dropdown.Button>
  
    </Row>
    <Row >
      <Line   style={{width:'100vw',height:'52vh'}} {...config} />
    </Row>
    </div>
   
    
      <BootomGraphs/>
      

      </>
  
  
  );
};

export default DemoLine;
