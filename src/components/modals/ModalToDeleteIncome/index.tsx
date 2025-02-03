import { useForm } from 'react-hook-form'
import { useGetIncome, useDeleteIncome } from '../../../hooks/useQueries/incomes';
import { IModalToDeleteIncomeProps } from '../../../types/modal.types';
import styles from './modalToDeleteIncome.module.scss'

interface FormValues {
  id: string,
}
export default function ModalToDeleteIncome({
  handleFunction,
  setFunction,
  monthId,
  selectedId,
}: IModalToDeleteIncomeProps) {
  const income = useGetIncome(selectedId);
  const mutation = useDeleteIncome();
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
              <h4>{income.data?.title}</h4>
            </div>
          <button type='submit'>SUPPRIMER LE REVENU</button>
        </form>
      </div>
    </article>
  );
}