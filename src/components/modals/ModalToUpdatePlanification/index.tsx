import { useForm } from 'react-hook-form'
import InputNumber from '../../../lib/hookFormFileds/InputNumber'
import styles from './modalToUpdatePlanification.module.scss'
import { IModalToUpdatePlanificationProps } from '../../../types/modal.types';
import { useGetPlanificationByMonth, useUpdatePlanification } from '../../../hooks/useQueries/planifications';

interface FormValues {
  fixedExpenses: number,
  variableExpenses: number,
  exceptionalExpenses: number,
  hobbies: number,
  remainder: number,
}
export default function ModalToUpdatePlanification({
  handleFunction,
  setFunction,
  monthId,
}: IModalToUpdatePlanificationProps) {
  const planificationByMonth = useGetPlanificationByMonth(monthId)
  const mutation = useUpdatePlanification()
  const { handleSubmit, control } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      console.log(data);
      mutation.mutate({_id: planificationByMonth.data?._id, updatedData: {month: monthId, fixedExpenses: data.fixedExpenses, variableExpenses: data.variableExpenses, exceptionalExpenses: data.exceptionalExpenses, hobbies: data.hobbies, remainder: data.remainder}})
      setTimeout(() => {
        setFunction((current) => !current);
      }, 100);
    };
  return (
    <article className={styles.container} onClick={() => handleFunction(monthId)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>MODIFIER</h2>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.inputsContainer}>
              {/* <h4>Nom du libellé concerné</h4> */}
              <InputNumber
                label='Dépenses fixes'
                name='fixedExpenses'
                defaultValue={planificationByMonth.data?.fixedExpenses}
                control={control}
                />
              <InputNumber
                label='Dépenses variables'
                name='variableExpenses'
                defaultValue={planificationByMonth.data?.variableExpenses}
                control={control}
                />
              <InputNumber
                label='Dépenses exceptionnelles'
                name='exceptionalExpenses'
                defaultValue={planificationByMonth.data?.exceptionalExpenses}
                control={control}
                />
              <InputNumber
                label='Loisirs'
                name='hobbies'
                defaultValue={planificationByMonth.data?.hobbies}
                control={control}
                />
              <InputNumber
                label='Epargne'
                name='remainder'
                defaultValue={planificationByMonth.data?.remainder}
                control={control}
                />
            </div>
          <button type='submit'>MODIFIER LA PLANIFICATION</button>
        </form>
      </div>
    </article>
  );
}