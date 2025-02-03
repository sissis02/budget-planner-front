import { useParams } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import { useGetYear } from '../../hooks/useQueries/years'
import YearNav from '../../components/YearNav'
import SimpleLineChart from '../../lib/charts/SimpleLineChart'
import LineChartConnect from '../../lib/charts/LineChartConnect'
import styles from './year.module.scss'

export default function Year() {
  const { width, height } = useWindowSize()
  const { id } = useParams()
  const year = useGetYear(id!)
  return (
    <>    
    {
      width >= 1024 && height >= 400
      ? (
      <div className={styles.page}>
        <YearNav year={year.data?.name} />
        <main>
          <h2>Vue annuelle des revenus et dépenses</h2>
          <section>
            <SimpleLineChart name={year.data?.name} />
          </section>
          <h2>Vue annuelle de l'épargne générée</h2>
          <section>
            <LineChartConnect name={year.data?.name}/>
          </section>
        </main>
      </div> )
      : <p>No</p>
      }
    </>
  )
}