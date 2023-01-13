import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import CategoryGraph, { ContentKind } from "../../components/categoryGraph";
import { SchemaCategory, SchemaObject } from "../../models/schemaCategory";

const schemaCategory: SchemaCategory = new SchemaCategory([new SchemaObject(1, 'Customer', [])], []);
const defaultQueryOld: string = 
`SELECT {
    ?customer ordered ?productName ;
        name ?customerName .
}
WHERE {
    ?product 49 ?productName ;
        -39/36 ?order .
    
    ?order -23/21 ?customer .
    ?customer 3 ?customerName .

    FILTER(?customerName != "Peter")
}`;

const defaultQuery: string = 
`SELECT {
    ?legalEntity legalName ?legalNameValue ;
        addressArea ?addressAreaValue ;
        postName ?postNameValue .
}
WHERE {
    ?legalEntity 25 ?address ;
        4 ?legalName .
    ?address 9 ?addressArea ;
        13 ?postName .

    ?legalName 2 "cs" ;
        3 ?legalNameValue .
    ?addressArea 7 "cs" ;
        9 ?addressAreaValue .
    ?postName 11 "cs" ;
        12 ?postNameValue .
}`;

const QueryPage: NextPage = () => {
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
                                />
                            </Grid>
                            <Grid item>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained">
                                        <Link href={'/query/execute'}>Execute</Link>
                                    </Button>
                                    <Button variant="outlined">
                                        <Link href={'/query/explain'}>
                                            Explain
                                        </Link>
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
