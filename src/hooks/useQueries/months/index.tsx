import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMonths, getMonthsByYear, getMonth, createMonth, updateMonth, deleteMonth } from "../../../api/months"

function useGetMonths() {
  return useQuery({
    queryKey: ['months'],
    queryFn: getMonths,
  })
}

function useGetMonthsByYear(_id: string) {
  return useQuery({
    queryKey: ['monthsByYear', _id],
    queryFn: () => getMonthsByYear(_id),
    enabled: !!_id,
  })
}

function useGetMonth(_id: string) {
  return useQuery({
    queryKey: ['month', _id],
    queryFn: () => getMonth(_id),
    enabled: !!_id,
  })
}

function useCreateMonth() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {name: string, year: string}) => createMonth(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['months'] })
      queryClient.invalidateQueries({ queryKey: ['monthsByYear', variables.year] })
    }
  })
}

function useUpdateMonth() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { _id: string, updatedData: {name: string, year: string}}) => updateMonth(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['months'] })
      queryClient.invalidateQueries({ queryKey: ['monthsByYear', variables.updatedData.year] })
    }
  })
}

function useDeleteMonth() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {_id: string, yearId: string}) => deleteMonth(data._id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['months'] })
      queryClient.invalidateQueries({ queryKey: ['monthsByYear', variables.yearId] })
    }
  })
}

export {
  useGetMonths,
  useGetMonthsByYear,
  useGetMonth,
  useCreateMonth,
  useUpdateMonth,
  useDeleteMonth,
}