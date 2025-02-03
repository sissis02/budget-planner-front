import { useForm } from 'react-hook-form'
import { useDeleteYear, useGetYear } from '../../../hooks/useQueries/years';
import { IModalToDeleteYearProps } from '../../../types/modal.types';
import styles from './modalToDeleteYear.module.scss'

interface FormValues {
  id: string,
}
export default function ModalToDeleteYear({
  handleFunction,
  setFunction,
  selectedId,
}: IModalToDeleteYearProps) {
  const year = useGetYear(selectedId);
  const mutation = useDeleteYear();
  const { handleSubmit } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      console.log(data);
        mutation.mutate({_id: selectedId});
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
              <h4>{year.data?.name}</h4>
            </div>
          <button type='submit'>SUPPRIMER L'ANNÉE</button>
        </form>
      </div>
    </article>
  );
}