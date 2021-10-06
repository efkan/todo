import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
    Icon,
    Paper,
    Box,
    Checkbox,
} from '@material-ui/core';
import { useTodos, useDeleteMutation, useUpdateMutation } from '../services/todos';


const useStyles = makeStyles({
    todosContainer: { marginTop: 10, padding: 10 },
    todoContainer: {
        borderTop: '1px solid #bfbfbf',
        marginTop: 5,
        '&:first-child': {
            margin: 0,
            borderTop: 'none',
        },
        '&:hover': {
            '& $deleteTodo': {
                visibility: 'visible',
            },
        },
    },
    todoTextCompleted: {
        textDecoration: 'line-through',
    },
    deleteTodo: {
        visibility: 'hidden',
    },
});

function Todos() {
    const classes = useStyles();
    const { mutate: deleteTodo } = useDeleteMutation();
    const { mutate: updateTodo } = useUpdateMutation();
    const {
        data,
        isFetching,
        isFetchingNextPage,
    } = useTodos();

    function toggleTodoCompleted(e, _id) {
        const params = { completed: e.target.checked };
        updateTodo({ _id, params });
    }

    if (isFetching && !isFetchingNextPage) {
        return null;
    }

    return (
        <Paper className={classes.todosContainer}>
            <Box display='flex' flexDirection='column' alignItems='stretch'>
                {data?.pages.map(page => page.data.map(({ _id, text, completed }) => (
                    <Box
                        key={_id}
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        className={classes.todoContainer}
                    >
                        <Checkbox
                            checked={completed}
                            onChange={(e) => toggleTodoCompleted(e, _id)}
                        ></Checkbox>
                        <Box flexGrow={1}>
                            <Typography
                                className={completed ? classes.todoTextCompleted : ''}
                                variant='body1'
                            >
                                {text}
                            </Typography>
                        </Box>
                        <Button
                            className={classes.deleteTodo}
                            startIcon={<Icon>delete</Icon>}
                            onClick={() => deleteTodo(_id)}
                        >
                            Delete
                        </Button>
                    </Box>
                )))}
            </Box>
        </Paper>
    )
}

export { Todos };
