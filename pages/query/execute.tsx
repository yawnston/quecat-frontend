import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const ExecutePage: NextPage = () => {
    const [isReady, setIsReady] = useState(false);
    setTimeout(() => setIsReady(true), 100);

    return (
        isReady
            ? <div>
                <span>Retrieved 2 results in 0.03 seconds.</span>

                <Stack spacing={2} direction="row">
                    <Button variant="contained">
                        <Link href={'/query/results/json'}>
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
