import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useWindowSize from '../../hooks/useWindowSize'
import { useGetMonths } from '../../hooks/useQueries/months'
import { useGetYears } from '../../hooks/useQueries/years'
import Mobile from '../Mobile/Mobile'
import Header from '../../components/Header'
import ModalToAddMonth from '../../components/modals/ModalToAddMonth'
import ModalToUpdateMonth from '../../components/modals/ModalToUpdateMonth'
import ModalToDeleteMonth from '../../components/modals/ModalToDeleteMonth'
import ModalToAddYear from '../../components/modals/ModalToAddYear'
import ModalToUpdateYear from '../../components/modals/ModalToUpdateYear'
import ModalToDeleteYear from '../../components/modals/ModalToDeleteYear'
import { IMonth } from '../../types/month.types'
import styles from './dashboard.module.scss'
import { IYear } from '../../types/year.types'

function Dashboard() {
  const { width, height } = useWindowSize()
  const months = useGetMonths()
  const years = useGetYears()

  const [modalToAddMonth, setModalToAddMonth] = useState<boolean>(false)
  const [modalToUpdateMonth, setModalToUpdateMonth] = useState<boolean>(false)
  const [modalToDeleteMonth, setModalToDeleteMonth] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<null | string>(null)
  const [modalToAddYear, setModalToAddYear] = useState<boolean>(false)
  const [modalToUpdateYear, setModalToUpdateYear] = useState<boolean>(false)
  const [modalToDeleteYear, setModalToDeleteYear] = useState<boolean>(false)
  const [yearId, setYearId] = useState<null| string>(null)

  const handleModalToAddMonth = () => {
    setTimeout(() => {
      setModalToAddMonth((current) => !current);
    }, 100);
  };

  const handleModalToUpdateMonth = (_id: string) => {
    setSelectedId(_id);
    setTimeout(() => {
      setModalToUpdateMonth((current) => !current);
    }, 100);
  };

  const handleModalToDeleteMonth = (_id: string) => {
    setSelectedId(_id);
    setTimeout(() => {
      setModalToDeleteMonth((current) => !current);
    }, 100);
  };

  const handleModalToAddYear = () => {
    setTimeout(() => {
      setModalToAddYear((current) => !current);
    }, 100);
  };

  const handleModalToUpdateYear = (_id: string) => {
    setYearId(_id);
    setTimeout(() => {
      setModalToUpdateYear((current) => !current);
    }, 100);
  };

  const handleModalToDeleteYear = (_id: string) => {
    setYearId(_id);
    setTimeout(() => {
      setModalToDeleteYear((current) => !current);
    }, 100);
  };

  return (
    <>
    {
      width >= 1024 && height >= 400
      ? (
        <div className={styles.page}>
          <Header />
          <main>
            <section>
              <div>
                <h2>Budgets par mois</h2>
                <button onClick={handleModalToAddMonth}>NOUVEAU</button>
              </div>
              <div className={styles.linksToMonths}>
                {months.data?.map((month: IMonth) => (
                <div key={month._id}>
                  <NavLink to={`/month/${month._id}`}>{month.name}</NavLink>
                  <div className={styles.actionsContainer}>
                    <p onClick={() => handleModalToUpdateMonth(month._id)}>Modifier le mois</p>
                    <p onClick={() => handleModalToDeleteMonth(month._id)}>Supprimer le mois</p>
                  </div>
                </div>
                ))}
              </div>
            </section>
            <hr />
            <section>
              <div>
                <h2>Analyses globales</h2>
                <button onClick={handleModalToAddYear}>NOUVEAU</button>
              </div>
              <div className={styles.linksToMonths}>
                {years.data?.map((year: IYear) => (
                  <div key={year._id}>
                    <NavLink to={`/year/${year._id}`}>{year.name}</NavLink>
                    <div className={styles.actionsContainer}>
                      <p onClick={() => handleModalToUpdateYear(year._id)}>Modifier l'année</p>
                      <p onClick={() => handleModalToDeleteYear(year._id)}>Supprimer l'année</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
          {
            modalToAddMonth && <ModalToAddMonth handleFunction={handleModalToAddMonth} setFunction={setModalToAddMonth}/>
          }
          {
            modalToUpdateMonth && selectedId && <ModalToUpdateMonth handleFunction={handleModalToUpdateMonth} setFunction={setModalToUpdateMonth} selectedId={selectedId}/>
          }
          {
            modalToDeleteMonth && selectedId && <ModalToDeleteMonth handleFunction={handleModalToDeleteMonth} setFunction={setModalToDeleteMonth} selectedId={selectedId}/>
          }
          {
            modalToAddYear && <ModalToAddYear handleFunction={handleModalToAddYear} setFunction={setModalToAddYear}/>
          }
          {
            modalToUpdateYear && yearId && <ModalToUpdateYear handleFunction={handleModalToUpdateYear} setFunction={setModalToUpdateYear} selectedId={yearId}/>
          }
          {
            modalToDeleteYear && yearId && <ModalToDeleteYear handleFunction={handleModalToDeleteYear} setFunction={setModalToDeleteYear} selectedId={yearId}/>
          }
        </div>
      )
      : <Mobile />
    }
    </>
  )
}

export default Dashboard

