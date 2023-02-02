import { AppstoreOutlined,  SettingOutlined,PartitionOutlined ,MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useNavigate , Link,useLocation} from 'react-router-dom';
const items = [
  // {
  //   label: <Link  to={"/Main"}  >홈</Link>,
  //   key: '/Main',
  //   path:"/Main" ,
  //   icon: <MailOutlined />,
  // },
  {
    label: <Link  to={"/Autocontrol"}  >자동</Link>,
    key: '/Autocontrol',
    path : "/Autocontrol",
    icon: <AppstoreOutlined />
  },
  {
    label: <Link  to={"/Cultivation"}  >재배실</Link>,
    key: '/Cultivation',
    path : '/Cultivation',
    icon: <SettingOutlined />,
  },
  {
    label: <Link  to={"/Glasscontrol"}  >유리</Link>,
    key: '/Glasscontrol',
    path : '/Glasscontrol',
    icon: <PartitionOutlined />,
  },
];
const MNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [navi, setNavi] = useState(false)
  const el = useRef()
  useEffect(()=>{
    const handlemenu = (e) => {
        if(navi && el.current&&!el.current.contains(e.target)){
          setNavi(false)
        }
    };
    document.addEventListener('mousedown', handlemenu)
    return () => {
        document.removeEventListener('mousedown', handlemenu)
    }
},[navi])
  return (
    <div className='mobile_btn_wrap' ref={el} >
    <Link className='mobile_title'  to={"/"}  >OLLEHFARM</Link>
    <Button className='mobile_btn' onClick={()=>setNavi(!navi)}>{navi ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</Button>
    {navi ? 
    <Menu 
    onClick={()=>{setNavi(!navi)}}
    className='mobile_main_navi'
    mode="inline" 
    selectedKeys={[location.pathname]} 
    items={items} />
    :""
    }
    </div>
  )
};
export default MNavigation;