import { useController } from 'react-hook-form'
import { ISelectsOptions } from '../../../types/hookFormFiels.types';
import styles from './selectsOptions.module.scss'

export default function SelectsOptions({
  label, name, defaultValue, control, rules, month, year,
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
          {month
            && <>
              <option value="">Mois</option>
              <option value="janvier">Janvier</option>
              <option value="fevrier">Février</option>
              <option value="mars">Mars</option>
              <option value="avril">Avril</option>
              <option value="mai">Mai</option>
              <option value="juin">Juin</option>
              <option value="juillet">Juillet</option>
              <option value="aout">Août</option>
              <option value="septembre">Septembre</option>
              <option value="octobre">Octobre</option>
              <option value="novembre">Novembre</option>
              <option value="decembre">Décembre</option>
            </>
          }
          {year
            && <>
              <option value="">Année</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </>
          }
        </select>
      </label>
    </div>
  )
}
