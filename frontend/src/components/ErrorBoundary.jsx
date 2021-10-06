import React from 'react';
import {
    Container,
    Paper,
    Grid
} from '@material-ui/core';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        const { hasError, error } = this.state;

        if (hasError) {
            const message = error.response?.data?.message || error.message;
            console.error(message);
            console.info('We do not need to show another component than the page the user working on.');
            console.info('We can also show notification or evaluate this error in different ways...');

            return (
                <Container maxWidth='md'>
                    <Paper>
                        <Grid container direction='column' spacing={1} justifyContent='center' alignItems='center'>
                            <h2>Something went wrong.</h2>
                            <p>{message}</p>
                        </Grid>
                    </Paper>
                </Container>
            );
        }

        return this.props.children;
    }
}

export { ErrorBoundary }
