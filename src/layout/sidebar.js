import { Space, Layout, theme, Menu } from 'antd';
import { AppstoreOutlined, MessageOutlined, ProjectOutlined, TeamOutlined} from '@ant-design/icons';
import Link from 'antd/es/typography/Link';


const { Content, Sider } = Layout;


const Sidebar = () => {


	const sidebarLinks = [
		{
			label: "Dashboard",
			icon: <AppstoreOutlined size="large" />
		},
		{
			label: "Overview",
			icon: <ProjectOutlined size="large" />
		},
		{
			label: "Chat",
			icon: <MessageOutlined size="large" />
		},
		{
			label: "Team",
			icon: <TeamOutlined size="large" />
		},
	]


	const {
		token: { colorBgContainer },
	} = theme.useToken();


	return (
		<Sider breakpoint="lg" collapsedWidth="0" width={300} className="hu-sidebar" style={{ backgroundColor: colorBgContainer }} >
			<Menu mode="inline" className='hu-sidebar__menu'>

				{sidebarLinks && sidebarLinks.map((val, i) => {
					return (
						<li key={i}>
							<Link href='' className="hu-sidebar__menu-item" >
								<Space size="middle" >
									{val.icon}
									{val.label}
								</Space>
							</Link>
						</li>
					)
				})}

			</Menu>
		</Sider>
	)
}

export default Sidebar;
