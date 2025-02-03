import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getIncomes,
  getIncomesByMonth,
  getSumIncomesByMonth,
  getAllSumIncomesByYear,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome
} from "../../../api/incomes"

function useGetIncomes() {
  return useQuery({
    queryKey: ['incomes'],
    queryFn: getIncomes,
  })
}

function useGetIncomesByMonth(_id: string) {
  return useQuery({
    queryKey: ['incomesByMonth', _id],
    queryFn: () => getIncomesByMonth(_id),
    enabled: !!_id,
  })
}

function useGetSumIncomesByMonth(_id: string) {
  return useQuery({
    queryKey: ['sumIncomesByMonth', _id],
    queryFn: () => getSumIncomesByMonth(_id),
    enabled: !!_id,
  })
}

function useGetAllSumIncomesByYear(year: string) {
  return useQuery({
    queryKey: ['sumsIncomesByYear', year],
    queryFn: () => getAllSumIncomesByYear(year),
    enabled: !!year,
  })
}

function useGetIncome(_id: string) {
  return useQuery({
    queryKey: ['income', _id],
    queryFn: () => getIncome(_id),
    enabled: !!_id,
  })
}

function useCreateIncome() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {title: string, date: string, amount: number, month: string}) => createIncome(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
      queryClient.invalidateQueries({ queryKey: ['incomesByMonth', variables.month] })
      queryClient.invalidateQueries({ queryKey: ['sumIncomesByMonth', variables.month] })
    }
  })
}

function useUpdateIncome() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { _id: string, updatedData: {title: string, date: string, amount: number, month: string}}) => updateIncome(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
      queryClient.invalidateQueries({ queryKey: ['incomesByMonth', variables.updatedData.month] })
      queryClient.invalidateQueries({ queryKey: ['sumIncomesByMonth', variables.updatedData.month] })
    }
  })
}

function useDeleteIncome() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {_id: string, monthId: string}) => deleteIncome(data._id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
      queryClient.invalidateQueries({ queryKey: ['incomesByMonth', variables.monthId] })
      queryClient.invalidateQueries({ queryKey: ['sumIncomesByMonth', variables.monthId] })
    }
  })
}

export {
  useGetIncomes,
  useGetIncomesByMonth,
  useGetSumIncomesByMonth,
  useGetAllSumIncomesByYear,
  useGetIncome,
  useCreateIncome,
  useUpdateIncome,
  useDeleteIncome,
}