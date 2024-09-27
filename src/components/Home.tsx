import  { useEffect, useState } from 'react'
import TableComponent from './TableComponent'
import { updateUserList } from '../store/Store';
import { fetchUsersList } from '../services/employeeServices';

const Home = () => {
    const { toggleCount } = updateUserList();
    const [tableData, setTableData] = useState([]);
    const loadUserList = async () => {
        try {
            const data = await fetchUsersList();
            setTableData(data);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    useEffect(() => {
        loadUserList();  // Call the service when component loads
    }, [toggleCount]);
  return (
    <div className='w-full h-full overflow-hidden'>
        <TableComponent datas={tableData}/>
    </div>
  )
}

export default Home