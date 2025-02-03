import { useForm } from 'react-hook-form'
import { useCreateYear } from '../../../hooks/useQueries/years';
import { IModalToAddYearProps } from '../../../types/modal.types';
import InputText from '../../../lib/hookFormFileds/InputText';
import styles from './modalToAddYear.module.scss'

interface FormValues {
  year: string,
}

export default function ModalToAddYear({
  handleFunction,
  setFunction
}: IModalToAddYearProps) {
  const mutation = useCreateYear()
  const { handleSubmit, control } = useForm<FormValues>({});
  const onSubmit = async (data: FormValues) => {
    mutation.mutate({name: data.year});
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
              <InputText
                label=''
                name='year'
                control={control}
                />
            </div>
          <button type='submit'>AJOUTER L'ANNÉE</button>
        </form>
      </div>
    </article>
  );
}