import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import useReactQueryStatus from './hooks/useReactQueryStatus';
import { useTodos } from './services/todos';
import { AddTodo, Todos } from './components';


const useStyles = makeStyles({
  statusContainer: { width: '100%', display: 'flex', justifyContent: 'center', margin: 20 },
});

function App() {
  const classes = useStyles();
  const statusText = useReactQueryStatus();
  const { fetchNextPage, hasNextPage } = useTodos();

  const loadMoreDivRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreDivRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <Container maxWidth='md'>
      <Typography variant='h3' component='h1' gutterBottom>
        Todos
      </Typography>

      <AddTodo />

      <Todos />

      <div ref={loadMoreDivRef} className={classes.statusContainer}>
        {statusText}
      </div>
    </Container>
  );
}

export default App;
