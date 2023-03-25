'use client';

import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryGraph, { ContentKind } from "../../components/categoryGraph";
import { SchemaCategory, SchemaObject } from "../../models/schemaCategory";

const schemaCategory: SchemaCategory = new SchemaCategory([new SchemaObject(1, 'Customer', [])], []);
const defaultQuery: string =
    `SELECT {
    ?order orderId ?orderId ;
        customerName ?customerName ;
        customerSurname ?customerSurname .
}
WHERE {
    ?customer -9 ?order ;
        2 ?customerName ;
        3 ?customerSurname .

    ?order 10 ?orderId .

    FILTER(?customerName = "Alice")
}`;

const QueryPage: NextPage = () => {
    const { push } = useRouter();
    const [queryText, setQueryText] = useState(defaultQuery);
    const handleInputChange = (event: any) => {
        console.log(event.target.value);
        setQueryText(event.target.value);
    };

    const handleExecute = async () => {
        const response = await fetch("http://localhost:8000/query/execute", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query_string: queryText
            })
        });

        const result = await response.json();
        push(`/query/execute?resultid=${result['id']}`);
    };

    const handleExplain = async () => {
        const response = await fetch("http://localhost:8000/query/plans", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query_string: queryText
            })
        });

        const result = await response.json();
        console.log(result)
        push(`/query/explain?resultid=${result['id']}`);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, height: '100%' }}>
                <Grid container columnSpacing={2} sx={{ height: '100%' }}>
                    <Grid item xs={6}>
                        <CategoryGraph schemaCategory={schemaCategory} contentKind={ContentKind.Schema} />
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container height={'100%'} flexDirection={'column'}
                            justifyContent={'space-between'} alignItems={'stretch'}
                        >
                            <Grid item>
                                <TextField label="Query" defaultValue={defaultQuery}
                                    multiline fullWidth spellCheck={false}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={handleExecute}>
                                        Execute
                                    </Button>
                                    <Button variant="outlined" onClick={handleExplain}>
                                        Explain
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default QueryPage
