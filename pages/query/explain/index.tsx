import { Button, Grid, Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlansTable from "../../../components/plansTable";

const ExplainPage: NextPage = () => {
    const router = useRouter();
    const [plans, setPlans] = useState(undefined);
    useEffect(() => {
        const response = fetch(`http://localhost:8000/query/plans/${router.query.resultid}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        response.then((x) => x.json()).then((responseJson) => { console.log(responseJson); setPlans(responseJson) });
    }, [router.query.resultid]);

    return (
        <Grid container height={'100%'} flexDirection={'column'}
            justifyContent={'space-between'} alignItems={'stretch'}
        >
            <Grid item>
                <PlansTable planInfo={plans}></PlansTable>
            </Grid>
            <Grid item>
                <Stack spacing={2} direction="row-reverse">
                    <Button variant="contained">
                        <Link href={'/query'}>Back to Query</Link>
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ExplainPage
