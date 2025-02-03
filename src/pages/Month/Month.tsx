import { Outlet, useParams } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import MonthNav from '../../components/MonthNav';
import styles from './month.module.scss'
import { useGetMonth } from '../../hooks/useQueries/months';
import Mobile from '../Mobile/Mobile';

export default function Month() {
    const { width, height } = useWindowSize()
    const { id } = useParams()
    const month = useGetMonth(id!)

    // if (!id) {
    //   return <p>Error: No ID provided</p>;
    // }
  
    // if (month.isLoading) {
    //   return <p>Loading...</p>;
    // }
  
    // if (month.isError) {
    //   return <p>Error loading data</p>;
    // }

  return (
    <>    
    {
      width >= 1024 && height >= 400
      ? (
    <div className={styles.page}>
      <MonthNav month={month.data?.name} selectedId={month.data?._id}/>
      <main>
        <Outlet />
      </main>
    </div> )
    : <Mobile />
    }
    </>
  );
}
