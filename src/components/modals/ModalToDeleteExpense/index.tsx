import { useForm } from 'react-hook-form'
import { useDeleteExpense, useGetExpense } from '../../../hooks/useQueries/expenses';
import { IModalToDeleteExpenseProps } from '../../../types/modal.types';
import styles from './modalToDeleteExpense.module.scss'

interface FormValues {
  id: string,
}
export default function ModalToDeleteExpense({
  handleFunction,
  setFunction,
  monthId,
  selectedId,
}: IModalToDeleteExpenseProps) {
  const expense = useGetExpense(selectedId);
  const mutation = useDeleteExpense();
  const { handleSubmit } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      console.log(data);
      mutation.mutate({_id: selectedId, monthId: monthId});
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
              <h4>{expense.data?.title}</h4>
            </div>
          <button type='submit'>SUPPRIMER LA DEPENSE</button>
        </form>
      </div>
    </article>
  );
}