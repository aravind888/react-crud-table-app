import { Layout} from 'antd';
import Sidebar from './sidebar';


const Main = (props) => {
  return (
    <>
      <Layout className='' >

        <Sidebar />
        
        <div className='hu-main w-100'>
          {props.children}
        </div>

      </Layout>
    </>
  )
}

export default Main;
