import { useController } from 'react-hook-form'
import { ISelectsOptions } from '../../../types/hookFormFiels.types';
import styles from './selectsOptionsCategories.module.scss'

export default function SelectsOptionsCategories({
  label, name, defaultValue, control, rules,
}: ISelectsOptions) {
  const { field } = useController({
    name, control, rules,
  });
  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        {label}
        <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          ref={field.ref}
        >
        <option value="">choisir</option>
        <option value="charges variables">charges variables</option>
        <option value="depenses exceptionnelles">Dépenses exceptionnelles</option>
        <option value="loisirs">Loisirs</option>
        </select>
      </label>
    </div>
  )
}
