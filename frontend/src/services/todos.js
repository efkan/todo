import axios from 'axios';
import { useMutation, useInfiniteQuery, useQueryClient } from 'react-query';

axios.defaults.baseURL = 'http://localhost:3001';

const queryKey = ['todos'];

export const useTodos = () => {
  const fetchData = async ({ pageParam = 0 }) => {
    const res = await axios.get(`/?cursor=${pageParam}`);
    return res.data;
  }

  const queryOptions = {
    refetchInterval: false,
    staleTime: Infinity,
    useErrorBoundary: true,
    retry: 3,
    retryDelay: 3000,
    getNextPageParam: lastPage => lastPage.nextPage || false,
  }

  return useInfiniteQuery(
    queryKey,
    fetchData,
    queryOptions,
  );
};


export const useAddMutation = () => {
  const queryClient = useQueryClient();
  const axiosOpts = { Headers: { "Content-Type": "application/json" } };
  const addTodo = (newTodo) => axios.post('/', newTodo, axiosOpts);

  return useMutation(
    addTodo,
    {
      onSuccess: (result) => {
        const { data } = result;

        // Adding new todo into the todos query state
        const state = queryClient.getQueryData(queryKey);
        const lastPageIndex = state.pages.length - 1;

        const todos = state.pages[lastPageIndex].data;

        const uncompletedTodos = todos.filter(todo => !todo.completed);
        uncompletedTodos.push(data);
        const completedTodos = todos.filter(todo => todo.completed);

        state.pages[lastPageIndex].data = [...uncompletedTodos, ...completedTodos];

        queryClient.setQueryData(queryKey, () => state);
      },
      useErrorBoundary: true
    }
  )
}


export const useDeleteMutation = () => {
  const deleteTodo = (_id) => axios.delete(`/${_id}`);
  const queryClient = useQueryClient();

  return useMutation(
    deleteTodo,
    {
      onSuccess: (result, _id) => {
        // Deleting todo from todos query state
        const state = queryClient.getQueryData(queryKey);

        state.pages.forEach(page => {
          const index = page.data.findIndex(todo => todo._id === _id);

          if (index > -1) {
            page.data.splice(index, 1);
          }
        });

        queryClient.setQueryData(queryKey, () => state);
      },
      useErrorBoundary: true
    }
  )
}


export const useUpdateMutation = () => {
  const updateTodo = ({_id, params}) => axios.put(`/${_id}`, params);
  const queryClient = useQueryClient();

  return useMutation(
    updateTodo,
    {
      onSuccess: (result, variables) => {
        const { _id, params } = variables;
        // Updating query state
        const state = queryClient.getQueryData(queryKey);
        state.pages.forEach(page => {
          page.data = page.data.map(todo => {
            if (todo._id === _id) {
              todo = {
                ...todo,
                ...params
              }
            }

            return todo;
          })
        });

        queryClient.setQueryData(queryKey, () => state);
      },
      useErrorBoundary: true
    }
  )
}
