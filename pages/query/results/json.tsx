import { TextField } from "@mui/material";
import { NextPage } from "next";

const jsonResults = `{ legalNameValue: "Technopark Management a.s. v likvidaci", addressAreaValue: "Staré Čívice", postNameValue: "Pardubice"}
{ legalNameValue: "Technopark Management a.s.", addressAreaValue: "Nové Čívice", postNameValue: "Hradec"}`;

const JsonResultsPage: NextPage = () => {

    return (
        <div>
            <TextField label="JSON results" defaultValue={jsonResults}
                multiline fullWidth spellCheck={false}
            />
        </div>
    );
}

export default JsonResultsPage
