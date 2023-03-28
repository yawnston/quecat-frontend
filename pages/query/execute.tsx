import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ExecutePage: NextPage = () => {
    const router = useRouter();
    const [result, setResult] = useState(undefined);
    const [isReady, setIsReady] = useState(false);
    setTimeout(() => setIsReady(true), 600);
    useEffect(() => {
        const response = fetch(`http://localhost:8000/query/${router.query.resultid}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        response.then((x) => x.json()).then((responseJson) => { setResult(responseJson) });
    }, [router.query.resultid]);

    return (
        isReady
            ? <div>
                <span>Retrieved {result?.results?.length} results in {result?.seconds_elapsed?.toFixed(2)} seconds.</span>

                <Stack spacing={2} direction="row">
                    <Button variant="contained">
                        <Link href={{
                            pathname: '/query/results/json',
                            query: {
                                resultid: router.query.resultid
                            }
                        }}>
                            JSON
                        </Link>
                    </Button>
                    <Button variant="contained">
                        RDF
                    </Button>
                    <Button variant="contained">
                        Instance Category
                    </Button>
                </Stack>
            </div>
            : <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size="5rem" />
            </Box>
    );
}

export default ExecutePage
