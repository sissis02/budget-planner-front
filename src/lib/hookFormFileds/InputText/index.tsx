import { Controller } from 'react-hook-form'
import { IInputText } from '../../../types/hookFormFiels.types';
import styles from './inputText.module.scss'

export default function InputText({
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
            type="text"
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