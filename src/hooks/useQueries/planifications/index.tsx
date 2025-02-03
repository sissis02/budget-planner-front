import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getPlanifications,
  getPlanificationByMonth,
  getPlanification,
  createPlanification,
  updatePlanification,
  deletePlanification,
} from "../../../api/planifications"

function useGetPlanifications() {
  return useQuery({
    queryKey: ['planifications'],
    queryFn: getPlanifications,
  })
}

function useGetPlanificationByMonth(_id: string) {
  return useQuery({
    queryKey: ['planificationByMonth', _id],
    queryFn: () => getPlanificationByMonth(_id),
    enabled: !!_id,
  })
}

function useGetPlanification(_id: string) {
  return useQuery({
    queryKey: ['planification', _id],
    queryFn: () => getPlanification(_id),
    enabled: !!_id,
  })
}

function useCreatePlanification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {month: string, fixedExpenses: number, variableExpenses: number, exceptionalExpenses: number, hobbies: number, remainder: number}) => createPlanification(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['planifications'] })
      queryClient.invalidateQueries({ queryKey: ['planificationByMonth', variables.month] })
    }
  })
}

function useUpdatePlanification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { _id: string, updatedData: {month: string, fixedExpenses: number, variableExpenses: number, exceptionalExpenses: number, hobbies: number, remainder: number}}) => updatePlanification(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['planifications'] })
      queryClient.invalidateQueries({ queryKey: ['planificationByMonth', variables.updatedData.month] })
    }
  })
}

function useDeletePlanification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: {_id: string, monthId: string}) => deletePlanification(data._id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['planifications'] })
      queryClient.invalidateQueries({ queryKey: ['planificationByMonth', variables.monthId] })
    }
  })
}

export {
  useGetPlanifications,
  useGetPlanificationByMonth,
  useGetPlanification,
  useCreatePlanification,
  useUpdatePlanification,
  useDeletePlanification,
}