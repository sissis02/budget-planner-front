import { useForm } from 'react-hook-form'
import { useCreateExpense } from '../../../hooks/useQueries/expenses';
import InputText from '../../../lib/hookFormFileds/InputText';
import InputDate from '../../../lib/hookFormFileds/InputDate';
import InputNumber from '../../../lib/hookFormFileds/InputNumber';
import { IModalToAddExpenseProps } from '../../../types/modal.types';
import styles from './modalToAddFixedExpense.module.scss'

interface FormValues {
  title: string,
  date: string,
  amount: number,
}

export default function ModalToAddFixedExpense({
  handleFunction,
  setFunction,
  monthId,
}: IModalToAddExpenseProps) {
  const mutation = useCreateExpense();
  const { handleSubmit, control } = useForm<FormValues>({});
  const onSubmit = async (data: FormValues) => {
    mutation.mutate({title: data.title, category: 'charges fixes', date: data.date, amount: data.amount, month: monthId});
    setTimeout(() => {
      setFunction((current) => !current);
    }, 100);
  };

  return (
    <article className={styles.container} onClick={handleFunction}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>AJOUTER</h2>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.inputsContainer}>
              <InputText
                label=''
                name='title'
                control={control}
                />
              <InputDate
                label=''
                name='date'
                control={control}
                />
              <InputNumber
                label=''
                name='amount'
                control={control}              
                />
            </div>
          <button type='submit'>AJOUTER LA DEPENSE FIXE</button>
        </form>
      </div>
    </article>
  );
}