import { TextField } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const jsonResults = `{ name: "Anne", ordered: ["The Da Vinci Code","Angels and Demons","Twilight","Digital Fortress"] }
{ name: "Erica", ordered: ["One Day","Atonement","Harry Potter and the Deathly Hallows"] }
{ name: "Gaven", ordered: ["Labyrinth","Angels and Demons","Life of Pi","Birdsong","Down Under","Billy Connolly"] }
{ name: "Laila", ordered: ["Hannibal","Deception Point","Chocolat","Brick Lane"] }
{ name: "Nikolai", ordered: ["Digital Fortress","Fifty Shades of Grey","Atonement","My Sister's Keeper","Twilight","Dear Fatty","Hannibal"] }
{ name: "Rylee", ordered: ["New Moon","Labyrinth","Twilight","Life of Pi"] }
{ name: "Shea", ordered: ["Chocolat"] }
{ name: "Matilda", ordered: ["Twilight","Harry Potter and the Deathly Hallows","One Day","My Sister's Keeper"] }
{ name: "Lucy", ordered: ["Dear Fatty","Birdsong","Angels and Demons","Jamie's Italy","New Moon"] }
{ name: "Rigoberto", ordered: ["White Teeth","Deception Point","Billy Connolly","Hannibal","Room on the Broom","Atonement","Digital Fortress"] }
{ name: "Aron", ordered: ["Room on the Broom","Down Under","Labyrinth","Brick Lane"] }
{ name: "Malaki", ordered: ["Life of Pi","Fifty Shades of Grey","To Kill a Mockingbird"] }
{ name: "Armando", ordered: ["Dear Fatty","Chocolat"] }
{ name: "Henry", ordered: ["Chocolat","Breaking Dawn","New Moon","Twilight","Deception Point","My Sister's Keeper"] }
{ name: "Nick", ordered: ["Harry Potter and the Deathly Hallows","Life of Pi","Birdsong","Labyrinth"] }
{ name: "Kaleb", ordered: ["New Moon","The Da Vinci Code","Deception Point","Angels and Demons","One Day","Atonement"] }
`;

const JsonResultsPage: NextPage = () => {
    const router = useRouter();
    const [result, setResult] = useState(undefined);
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
        <div>
            <TextField label="JSON results" value={result?.results.map(x => JSON.stringify(x)).join('\n')}
                multiline fullWidth spellCheck={false}
            />
        </div>
    );
}

export default JsonResultsPage
