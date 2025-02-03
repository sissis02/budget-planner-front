import { useForm } from 'react-hook-form'
import { useCreateMonth } from '../../../hooks/useQueries/months';
import { IModalToAddMonthProps } from '../../../types/modal.types';
import SelectsOptions from '../../../lib/hookFormFileds/SelectsOptions'
import styles from './modalToAddMonth.module.scss'

interface FormValues {
  month: string,
  year: string,
}

export default function ModalToAddMonth({
  handleFunction,
  setFunction
}: IModalToAddMonthProps) {
  const mutation = useCreateMonth();
  const { handleSubmit, control } = useForm<FormValues>({});
  const onSubmit = async (data: FormValues) => {
    const name = data.month + ' ' + data.year;
    mutation.mutate({name: name, year: data.year});
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
            <div className={styles.selectsContainer}>
              <SelectsOptions
                label=''
                name='month'
                control={control}
                rules={{ required: 'Veuillez choisir un mois et une année' }}
                month
                />
              <SelectsOptions
                label=''
                name='year'
                control={control}
                rules={{ required: 'Veuillez choisir un mois et une année' }}
                year
                />
            </div>
          <button type='submit'>AJOUTER LE BUDGET MENSUEL</button>
        </form>
      </div>
    </article>
  );
}