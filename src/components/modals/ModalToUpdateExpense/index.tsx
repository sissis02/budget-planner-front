import { useForm } from 'react-hook-form'
import { useGetExpense, useUpdateExpense } from '../../../hooks/useQueries/expenses';
import InputNumber from '../../../lib/hookFormFileds/InputNumber'
import InputText from '../../../lib/hookFormFileds/InputText';
import InputDate from '../../../lib/hookFormFileds/InputDate';
import SelectsOptionsCategories from '../../../lib/hookFormFileds/SelectsOptionsCategories';
import { IModalToUpdateExpenseProps } from '../../../types/modal.types';
import styles from './modalToUpdateExpense.module.scss'

interface FormValues {
  title: string,
  category: string,
  date: string,
  amount: number,
}
export default function ModalToUpdateExpense({
  handleFunction,
  setFunction,
  monthId,
  selectedId,
}: IModalToUpdateExpenseProps) {
  const expense = useGetExpense(selectedId);
  const mutation = useUpdateExpense();
  const { handleSubmit, control } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      console.log(data);
      mutation.mutate({_id: selectedId, updatedData: {title: data.title, category: data.category, date: data.date, amount: data.amount, month: monthId} })
      setTimeout(() => {
        setFunction((current) => !current);
      }, 100);
    };
  return (
    <article className={styles.container} onClick={() => handleFunction(selectedId)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>MODIFIER</h2>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.inputsContainer}>
              <InputText 
                label=''
                name='title'
                defaultValue={expense.data?.title}
                control={control}
                />
              <SelectsOptionsCategories 
                label=''
                name='category'
                defaultValue=''
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
                defaultValue={expense.data?.amount}
                control={control}
                />
            </div>
          <button type='submit'>MODIFIER LA DEPENSE</button>
        </form>
      </div>
    </article>
  );
}