import { HomeOutlined, SmileOutlined, SettingOutlined,PartitionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useNavigate , Link,useLocation} from 'react-router-dom';
const items = [
  {
    label: <Link  to={"/"}  >홈</Link>,
    key: '/',
    path:"/" ,
    icon: <HomeOutlined />,
  },
  {
    label: <Link  to={"/Autocontrol"}  >자동</Link>,
    key: '/Autocontrol',
    path : "/Autocontrol",
    icon: <SmileOutlined />
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
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location.pathname,'pathname')
  return <Menu 
    className='main_navi'
    mode="inline" 
    selectedKeys={[location.pathname]} 
    items={items} />;
};
export default Navigation;