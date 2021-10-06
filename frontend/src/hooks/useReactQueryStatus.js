import { useTodos, useAddMutation, useDeleteMutation, useUpdateMutation } from '../services/todos';

function useReactQueryStatus() {
  const { isLoading: isAdding } = useAddMutation();
  const { isLoading: isDeleting } = useDeleteMutation();
  const { isLoading: isUpdating } = useUpdateMutation();
  const { isFetchingNextPage } = useTodos();

  return (
    isDeleting
      ? 'Deleting'
      : isUpdating
        ? 'Updating...'
        : isAdding
          ? 'Adding..'
          : isFetchingNextPage
            ? 'Loading more...'
            : 'Nothing more to load'
  );
}

export default useReactQueryStatus;