import { useForm } from 'react-hook-form'
import { useUpdateMonth } from '../../../hooks/useQueries/months';
import { IModalToUpdateMonthProps } from '../../../types/modal.types';
import SelectsOptions from '../../../lib/hookFormFileds/SelectsOptions';
import styles from './modalToUpdateMonth.module.scss'

interface FormValues {
  month: string,
  year: string,
}
export default function ModalToUpdateMonth({
  handleFunction,
  setFunction,
  selectedId,
}: IModalToUpdateMonthProps) {
  const mutation = useUpdateMonth();
  const { handleSubmit, control } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      const name = data.month + ' ' + data.year;
      mutation.mutate({_id: selectedId, updatedData: {name: name, year: data.year}});
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
          <button type='submit'>MODIFIER LE MOIS</button>
        </form>
      </div>
    </article>
  );
}