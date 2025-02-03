import { useForm } from 'react-hook-form'
import { useDeleteMonth, useGetMonth } from '../../../hooks/useQueries/months';
import { IModalToDeleteMonthProps } from '../../../types/modal.types';
import styles from './modalToDeleteMonth.module.scss'

interface FormValues {
  id: string,
}
export default function ModalToDeleteMonth({
  handleFunction,
  setFunction,
  selectedId,
}: IModalToDeleteMonthProps) {
  const month = useGetMonth(selectedId);
  const mutation = useDeleteMonth();
  const { handleSubmit } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      console.log(data);
        mutation.mutate({_id: selectedId, yearId: month.data?.year});
      setTimeout(() => {
        setFunction((current) => !current);
      }, 100);
    };
  return (
    <article className={styles.container} onClick={() => handleFunction(selectedId)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>SUPPRIMER</h2>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.inputsContainer}>
              <h4>{month.data?.name}</h4>
            </div>
          <button type='submit'>SUPPRIMER LE MOIS</button>
        </form>
      </div>
    </article>
  );
}