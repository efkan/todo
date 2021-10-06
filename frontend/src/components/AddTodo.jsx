import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Icon,
  Paper,
  Box,
  TextField,
} from '@material-ui/core';
import { useAddMutation } from '../services/todos';


const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
});


const AddTodo = () => {
  const classes = useStyles();
  const {
    isSuccess: isAddingSuccess,
    mutate: addTodo
  } = useAddMutation();

  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    if (newTodoText) {
      setNewTodoText('');
    }
  }, [isAddingSuccess]);

  return (
    <Paper className={classes.addTodoContainer}>
      <Box display='flex' flexDirection='row'>
        <Box flexGrow={1}>
          <TextField
            fullWidth
            value={newTodoText}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                addTodo({ text: newTodoText });
              }
            }}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
        </Box>
        <Button
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
          onClick={() => addTodo({ text: newTodoText })}
        >
          Add
        </Button>
      </Box>
    </Paper>
  )
}

  export { AddTodo };
