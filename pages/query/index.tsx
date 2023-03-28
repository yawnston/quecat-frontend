'use client';

import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryGraph, { ContentKind } from "../../components/categoryGraph";
import { SchemaCategory, SchemaObject } from "../../models/schemaCategory";
import useDebounce from "../../utils/debounceHook";

const schemaCategory: SchemaCategory = new SchemaCategory([new SchemaObject(1, 'Customer', [])], []);
const defaultQuery: string =
    `SELECT {
    ?order itemId ?itemId ;
        status ?status ;
        customerName ?name ;
        city ?city .
}
WHERE {
    ?order 10 ?id ;
        11 ?status ;
        12/14 ?itemId ;
        9 ?customer .

    ?customer 2 ?name ;
        4/7 ?city .

    FILTER(?name = "Alice")
    VALUES ?status {"completed" "shipped"}
}`;

const dbObjectInfos = [
    {
        key: 2,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["1", "2"]
    },
    {
        key: 3,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["1", "2"]
    },
    {
        key: 6,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["2"]
    },
    {
        key: 9,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["2"]
    },
    {
        key: 11,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["1"]
    },
    {
        key: 13,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["1"]
    },
    {
        key: 17,
        is_in_projection: false,
        is_in_query: false,
        is_in_filter: false,
        is_in_aggregation: false,
        database_ids: ["1"]
    }
];

const QueryPage: NextPage = () => {
    const { push } = useRouter();
    const [queryText, setQueryText] = useState(defaultQuery);
    const queryTextDebounce = useDebounce(queryText, 1000);
    const [objectInfos, setObjectInfos] = useState(dbObjectInfos);

    const handleInputChange = (event: any) => {
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

    useEffect(() => {
        fetch("http://localhost:8000/query/objectinfo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                query_string: queryText
            })
        }).then(x => x.json()).then(x => {
            if (!(x.infos[0])) {
                setObjectInfos([...dbObjectInfos]);
            } else {
                setObjectInfos([...dbObjectInfos, ...x.infos[0].object_info]);
            }
        });
    }, [queryTextDebounce]);

    return (
        <>
            <Box sx={{ flexGrow: 1, height: '100%' }}>
                <Grid container columnSpacing={2} sx={{ height: '100%' }}>
                    <Grid item xs={6}>
                        <CategoryGraph schemaCategory={schemaCategory}
                            contentKind={ContentKind.Schema} objectInfos={objectInfos} />
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
