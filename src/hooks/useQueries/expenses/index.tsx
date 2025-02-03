import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getExpenses,
  getExpensesByMonth,
  getFixedExpensesByMonth,
  getSumExpensesByMonth,
  getAllSumExpensesByYear,
  getSumFixedExpensesByMonth,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../../api/expenses"

function useGetExpenses() {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  })
}

function useGetExpensesByMonth(_id: string) {
  return useQuery({
    queryKey: ['expensesByMonth', _id],
    queryFn: () => getExpensesByMonth(_id),
    enabled: !!_id,
  })
}

function useGetFixedExpensesByMonth(_id: string) {
  return useQuery({
    queryKey: ['fixedExpensesByMonth', _id],
    queryFn: () => getFixedExpensesByMonth(_id),
    enabled: !!_id,
  })
}

function useGetSumExpensesByMonth(_id: string) {
  return useQuery({
    queryKey: ['sumExpensesByMonth', _id],
    queryFn: () => getSumExpensesByMonth(_id),
    enabled: !!_id,
  })
}

function useGetAllSumExpensesByYear(year: string) {
  return useQuery({
    queryKey: ['sumsExpensesByYear', year],
    queryFn: () => getAllSumExpensesByYear(year),
    enabled: !!year,
  })
}

function useGetSumFixedExpensesByMonth(_id: string) {
  return useQuery({
    queryKey: ['sumFixedExpensesByMonth', _id],
    queryFn: async () => getSumFixedExpensesByMonth(_id),
    enabled: !!_id,
  })
}

function useGetExpense(_id: string) {
  return useQuery({
    queryKey: ['expense', _id],
    queryFn: () => getExpense(_id),
    enabled: !!_id,
  })
}

function useCreateExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {title: string, category: string, date: string, amount: number, month: string}) => createExpense(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['expensesByMonth', variables.month] })
      queryClient.invalidateQueries({ queryKey: ['fixedExpensesByMonth', variables.month] })
      queryClient.invalidateQueries({ queryKey: ['sumExpensesByMonth', variables.month] })
      queryClient.invalidateQueries({ queryKey: ['sumFixedExpensesByMonth', variables.month] })
    }
  })
}

function useUpdateExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { _id: string, updatedData: {title: string, category: string, date: string, amount: number, month: string}}) => updateExpense(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['expensesByMonth', variables.updatedData.month] })
      queryClient.invalidateQueries({ queryKey: ['fixedExpensesByMonth', variables.updatedData.month] })
      queryClient.invalidateQueries({ queryKey: ['sumExpensesByMonth', variables.updatedData.month] })
      queryClient.invalidateQueries({ queryKey: ['sumFixedExpensesByMonth', variables.updatedData.month] })
    }
  })
}

function useDeleteExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {_id: string, monthId: string}) => deleteExpense(data._id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['expensesByMonth', variables.monthId] })
      queryClient.invalidateQueries({ queryKey: ['fixedExpensesByMonth', variables.monthId] })
      queryClient.invalidateQueries({ queryKey: ['sumExpensesByMonth', variables.monthId] })
      queryClient.invalidateQueries({ queryKey: ['sumFixedExpensesByMonth', variables.monthId] })
    }
  })
}

export {
  useGetExpenses,
  useGetExpensesByMonth,
  useGetFixedExpensesByMonth,
  useGetSumExpensesByMonth,
  useGetAllSumExpensesByYear,
  useGetSumFixedExpensesByMonth,
  useGetExpense,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
}