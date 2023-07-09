import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import './index.css'
import { Dropdown, message,Row,Col,Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
const BootomGraphs = () => {

    const [data, setData] = useState([]);
    const [mon,setMon] = useState("4p");
    const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 525px)").matches);
    const [writes,setWrites] = useState("May - June 2023");
    
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.matchMedia("(min-width: 525px)").matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
        const respons = await fetch(` http://localhost:3000/${mon}`, {
            method: "GET",
        });
        
        const user = await respons.json();
        setData(user);
    }

    const items = [
    {
      label: 'May - June 2023',
      key: '5p',
      icon: <UserOutlined />,
    },
    {
      label: 'April - May 2023',
      key: '4p',
      icon: <UserOutlined />,
    },
    {
      label: 'March - April 2023',
      key: '3p',
      icon: <UserOutlined />,
    },
  
    ];
    const handleMenuClick = (e) => {
        setMon(e.key)
        message.info(`selcted ${(items.find(item => item.key === mon)).label} as a range`);
        
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
  };
    const desiredItem = items.find(item => item.key === mon);

      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'name',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
            
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
        
        
      };
  return (
    <div>
        
        <div className="content__chart">
        <div className="piecharts">
            {isLargeScreen? (
                    <Row>
                        <Space align="center" size={250}>
                            <Col>
                                <h2 className='head'>Top Products</h2>
                            </Col>
                            <Col>
                                <Dropdown.Button menu={menuProps}  style={{marginTop:'1rem'}}>
                                        <span style={{display:'inline'}}>{writes}</span>
                                </Dropdown.Button>
                            </Col>
                        </Space>
                    </Row>
                )
                :
                    <Row>

                            <h2 className='head'>Top Products</h2>
                    
                            <Dropdown.Button menu={menuProps}  style={{marginTop:'1rem'}}>
                                    <span style={{display:'inline'}}>{writes}</span>
                            </Dropdown.Button>
                    
                
                    </Row>
                    }
            
                {!isLargeScreen ? (<Pie {...config} legend= {{position: 'top-right',}} />):(<Pie {...config} legend= {{position: 'right',}} />)}
                
            </div>
        
            <div className="timeline">
           <div className="heading">
           {isLargeScreen? (
                    <Row>
                        <Space align="center" size={300}>
                            <Col>
                                <h2 className='head'>Today’s schedule</h2>
                            </Col>
                            <Col>
                               See More
                            </Col>
                        </Space>
                    </Row>
                )
                :
                <Row>
                <Space align="center" size={30}>
                    <Col>
                        <h2 className='head'>Today’s schedule</h2>
                    </Col>
                    <Col>
                       See More
                    </Col>
                </Space>
            </Row>
            }
           </div>
            <br/>
            <div className="work__cards" key={1} style={{  borderLeft:' 15px solid #9BDD7C' }}>
                    <h3 className="work__title">Meeting with suppliers from Kuta Bali</h3>
                    <div className="work__buttons">14.00-15.00 </div>
                    <div className="work__buttons">at Sunset Road, Kuta, Bali </div>
                  </div>
            <div className="work__cards" key={2}  style={{  borderLeft:' 15px solid #6972C3' }}>
            <h3 className="work__title">Check operation at Giga Factory 1</h3>
            <div className="work__buttons">18.00-20.00</div>
                    <div className="work__buttons">at Central Jakarta</div>
            </div>
            </div>
            </div>
        
    </div>
  )
}

export default BootomGraphs;
