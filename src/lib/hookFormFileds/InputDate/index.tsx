import { Controller } from 'react-hook-form'
import { IInputText } from '../../../types/hookFormFiels.types';
import styles from './inputDate.module.scss'

export default function InputDate({
    label,
    name,
    defaultValue,
    control,
    rules,
  }: IInputText) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({
        field: {
          value = '',
          ref,
          onChange,
          onBlur,
        },
      }) => (
        <label htmlFor={name} className={styles.container}>
          {label}
          <input
            type="date"
            name={name}
            id={name}
            value={value}
            ref={ref}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            min="2025-01-01"
          />
        </label>
      )}
    />
  );
}