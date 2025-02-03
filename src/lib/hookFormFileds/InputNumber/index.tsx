import { Controller } from 'react-hook-form'
import { IInputNumber } from '../../../types/hookFormFiels.types';
import styles from './inputNumber.module.scss'

export default function InputNumber({
    label,
    name,
    defaultValue,
    control,
    rules,
  }: IInputNumber) {
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
            type="number"
            name={name}
            id={name}
            value={value}
            ref={ref}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
              />
        </label>
      )}
    />
  );
}