import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import CategoryGraph, { ContentKind } from "../../../components/categoryGraph";
import { planCosts, recalculatedPlanCosts, getRowsFromData } from "../../../components/plansTable";

const PlanExplainPage: NextPage = () => {
    const router = useRouter();
    const { planId } = router.query;
    const [_ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [plans, setPlans] = useState(undefined);
    useEffect(() => {
        const response = fetch(`http://localhost:8000/query/plans/${planId.slice(0, -2)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        response.then((x) => x.json()).then((responseJson) => { console.log(responseJson); setPlans(responseJson) });
    }, []);

    const planDetails = getRowsFromData(plans).find(x => x.planId === planId);
    const planIndex = getRowsFromData(plans).findIndex(x => x.planId === planId);

    const handleExecute = async () => {
        console.error(planId);
        const response = await fetch(`http://localhost:8000/query/execute/${planId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        });

        const result = await response.json();
        router.push(`/query/execute?resultid=${result['id']}`);
    };

    const rightGridItems = [];
    rightGridItems.push(
        <Grid item>
            <div>
                <div><b>Plan ID: </b>{planId}</div>
                <div><b>Plan cost: </b>{planDetails?.cost}</div>
                <div><b>Databases used: </b>{planDetails?.databases.join(', ')}</div>
                <div><b>Is default plan: </b>{planDetails?.isDefault ? 'Yes' : 'No'}</div>
            </div>
        </Grid>
    );
    planDetails?.queries.forEach((query, index) => {
        rightGridItems.push(
            <Grid item width={'100%'}>
                <TextField label={`Query ${index}`} defaultValue={query}
                    multiline fullWidth spellCheck={false}
                    maxRows={7}
                    minRows={7}
                />
            </Grid>
        );
    });
    rightGridItems.push(
        <Grid item>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleExecute}>
                    Execute plan
                </Button>
                <Button variant="outlined" onClick={() => {
                    planCosts[planIndex] = recalculatedPlanCosts[planIndex];
                    forceUpdate();
                }}>
                    Recalculate plan cost
                </Button>
                <Button variant="outlined">
                    <Link href={'/query/explain'}>
                        Back
                    </Link>
                </Button>
            </Stack>
        </Grid>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, height: '100%' }}>
                <Grid container columnSpacing={2} sx={{ height: '100%' }}>
                    <Grid item xs={6}>
                        <CategoryGraph schemaCategory={undefined} contentKind={ContentKind.Schema}
                            objectInfos={planDetails?.objectInfos} />
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container height={'100%'} flexDirection={'column'}
                            justifyContent={'space-between'} alignItems={'stretch'}
                        >
                            {rightGridItems}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default PlanExplainPage
