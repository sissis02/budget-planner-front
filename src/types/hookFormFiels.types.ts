/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseControllerProps, Control } from "react-hook-form"

export interface ISelectsOptions extends UseControllerProps {
  label: string,
  name: string,
  defaultValue?: string,
  control: Control<any>,
  rules?: Record<string, any>,
  month?: boolean | undefined,
  year?: boolean | undefined,
}

export interface IInputText {
  label: string,
  name: string,
  defaultValue?: string,
  control: any,
  rules?: Record<string, any>,
}

export interface IInputNumber {
  label: string,
  name: string,
  defaultValue?: number,
  control: any,
  rules?: Record<string, any>,
}