import { useForm } from 'react-hook-form'
import { useGetYear, useUpdateYear } from '../../../hooks/useQueries/years';
import { IModalToUpdateYearProps } from '../../../types/modal.types';
import InputText from '../../../lib/hookFormFileds/InputText';
import styles from './modalToUpdateYear.module.scss'

interface FormValues {
  name: string,
}
export default function ModalToUpdateYear({
  handleFunction,
  setFunction,
  selectedId,
}: IModalToUpdateYearProps) {
  const year = useGetYear(selectedId)
  const mutation = useUpdateYear()
  const { handleSubmit, control } = useForm<FormValues>({});
    const onSubmit = async (data: FormValues) => {
      mutation.mutate({_id: selectedId, updatedData: {name: data.name}});
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
              <InputText 
                label=''
                name='name'
                defaultValue={year.data?.name}
                control={control}
                />
            </div>
          <button type='submit'>MODIFIER L'ANNÉE</button>
        </form>
      </div>
    </article>
  );
}