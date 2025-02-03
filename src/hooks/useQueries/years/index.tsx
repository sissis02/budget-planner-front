import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getYears, getYear, createYear, updateYear, deleteYear } from "../../../api/years"

function useGetYears() {
  return useQuery({
    queryKey: ['years'],
    queryFn: getYears,
  })
}

function useGetYear(_id: string) {
  return useQuery({
    queryKey: ['year', _id],
    queryFn: () => getYear(_id),
    enabled: !!_id,
  })
}

export const useCreateYear = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {name: string}) => createYear(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['years'] })
    }
  })
}

function useUpdateYear() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { _id: string, updatedData: {name: string}}) => updateYear(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['years'] })
    }
  })
}

function useDeleteYear() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {_id: string}) => deleteYear(data._id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['years'] })
    }
  })
}

export {
  useGetYears,
  useGetYear,
  // useCreateYear,
  useUpdateYear,
  useDeleteYear,
}