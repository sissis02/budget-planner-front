import { useForm } from 'react-hook-form'
import { useGetIncome, useUpdateIncome } from '../../../hooks/useQueries/incomes'
import InputText from '../../../lib/hookFormFileds/InputText'
import InputNumber from '../../../lib/hookFormFileds/InputNumber'
import InputDate from '../../../lib/hookFormFileds/InputDate'
import { IModalToUpdateIncomeProps } from '../../../types/modal.types'
import styles from './modalToUpdateIncome.module.scss'

interface FormValues {
  title: string,
  date: string,
  amount: number,
}
export default function ModalToUpdateIncome({
  handleFunction,
  setFunction,
  monthId,
  selectedId,
}: IModalToUpdateIncomeProps) {
  const income = useGetIncome(selectedId);
  const mutation = useUpdateIncome();
  const { handleSubmit, control } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      console.log(data);
      mutation.mutate({_id: selectedId, updatedData: {title: data.title, date: data.date, amount: data.amount, month: monthId} })
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
                defaultValue={income.data?.title}
                control={control}
                />
              <InputDate
                label=''
                name='date'
                control={control}
                defaultValue={income.data?.date}            
                />
              <InputNumber
                label=''
                name='amount'
                control={control}
                defaultValue={income.data?.amount}
                />
            </div>
          <button type='submit'>MODIFIER LE REVENU</button>
        </form>
      </div>
    </article>
  );
}