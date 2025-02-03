import { useForm } from 'react-hook-form'
import { useCreatePlanification } from '../../../hooks/useQueries/planifications';
import InputNumber from '../../../lib/hookFormFileds/InputNumber';
import { IModalToAddPlanificationProps } from '../../../types/modal.types';
import styles from './modalToAddPlanification.module.scss'

interface FormValues {
  fixedExpenses: number,
  variableExpenses: number,
  exceptionalExpenses: number,
  hobbies: number,
  remainder: number,
}

export default function ModalToAddPlanification({
  handleFunction,
  setFunction,
  monthId,
}: IModalToAddPlanificationProps) {
  const mutation = useCreatePlanification();
  const { handleSubmit, control } = useForm<FormValues>({});
  const onSubmit = async (data: FormValues) => {
    mutation.mutate({month: monthId, fixedExpenses: data.fixedExpenses, variableExpenses: data.variableExpenses, exceptionalExpenses: data.exceptionalExpenses, hobbies: data.hobbies, remainder: data.remainder});
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
              <InputNumber
                label='Dépenses fixes'
                name='fixedExpenses'
                control={control}              
                />
              <InputNumber
                label='Dépenses variables'
                name='variableExpenses'
                control={control}              
                />
              <InputNumber
                label='Dépenses exceptionnelles'
                name='exceptionalExpenses'
                control={control}              
                />
              <InputNumber
                label='Loisirs'
                name='hobbies'
                control={control}              
                />
              <InputNumber
                label='Epargne'
                name='remainder'
                control={control}              
                />
            </div>
          <button type='submit'>AJOUTER LA PLANIFICATION</button>
        </form>
      </div>
    </article>
  );
}