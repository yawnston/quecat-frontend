import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const CytoscapeComponent = dynamic(() => import('react-cytoscapejs'), { ssr: false });
import { SchemaCategory } from '../models/schemaCategory';
import { Core, ElementDefinition } from 'cytoscape';
import { cytoscapeStylesheet } from '../utils/cytoscapeStylesheet';

export enum ContentKind {
    Schema = 'schema',
    Query1 = 'query1',
    Query2 = 'query2',
}

type CategoryGraphProps = {
    schemaCategory: SchemaCategory | undefined,
    contentKind: ContentKind,
}

// I tried looking at Unibench queries to maybe represent those, but:
//  - there is not much redundancy in the Unibench model
//  - the model is not that well specified (IMO)
//  - I would need to transform the model to category representation
const elements_schema_old: ElementDefinition[] = [
    // Databases
    { data: { id: 'mongodb', label: 'MongoDB' }, classes: 'group group-1' },
    { data: { id: 'cassandra', label: 'Cassandra' }, classes: 'group group-2' },
    { data: { id: 'postgres', label: 'PostgreSQL' }, classes: 'group group-3' },
    { data: { id: 'neo4j', label: 'Neo4j' }, classes: 'group group-4' },

    // Nodes
    { data: { id: '100', label: 'Customer', parent: 'postgres' }, position: { x: 100, y: 100 }, classes: 'selection-root' },
    { data: { id: 'Cassandra100', label: undefined, parent: 'cassandra' }, position: { x: 100, y: 100 }, classes: 'group-placeholder' },
    { data: { id: 'Neo4j100', label: undefined, parent: 'neo4j' }, position: { x: 100, y: 100 }, classes: 'group-placeholder' },

    { data: { id: '101', label: 'Id', parent: 'postgres' }, position: { x: 0, y: 100 } },
    { data: { id: 'Cassandra101', label: undefined, parent: 'cassandra' }, position: { x: 0, y: 100 }, classes: 'group-placeholder' },
    { data: { id: 'Neo4j101', label: undefined, parent: 'neo4j' }, position: { x: 0, y: 100 }, classes: 'group-placeholder' },

    { data: { id: '102', label: 'Name', parent: 'postgres' }, position: { x: 0, y: 200 }, classes: 'selection-root availability-ambiguous' },
    { data: { id: 'Neo4j102', label: undefined, parent: 'neo4j' }, position: { x: 0, y: 200 }, classes: 'group-placeholder' },

    { data: { id: '104', label: 'Surname', parent: 'postgres' }, position: { x: 100, y: 200 } },
    { data: { id: 'Neo4j104', label: undefined, parent: 'neo4j' }, position: { x: 100, y: 200 }, classes: 'group-placeholder' },
    
    { data: { id: '110', label: 'Orders', parent: 'cassandra' }, position: { x: 200, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'Neo4j110', label: undefined, parent: 'neo4j' }, position: { x: 200, y: 0 }, classes: 'group-placeholder' },

    { data: { id: '111', label: 'Order', parent: 'cassandra' }, position: { x: 300, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'Mongo111', label: undefined, parent: 'mongodb' }, position: { x: 300, y: 0 }, classes: 'group-placeholder' },
    { data: { id: 'Neo4j111', label: undefined, parent: 'neo4j' }, position: { x: 300, y: 0 }, classes: 'group-placeholder' },

    { data: { id: '112', label: 'Number', parent: 'cassandra' }, position: { x: 300, y: -100 } },
    { data: { id: '116', label: 'Value', parent: 'mongodb' }, position: { x: 400, y: -100 } },
    { data: { id: '113', label: 'Contact', parent: 'mongodb' }, position: { x: 400, y: 0 } },
    { data: { id: '114', label: 'Type', parent: 'mongodb' }, position: { x: 500, y: 0 } },
    { data: { id: '115', label: 'Name', parent: 'mongodb' }, position: { x: 500, y: -100 } },
    { data: { id: '117', label: 'Items', parent: 'mongodb' }, position: { x: 400, y: 100 }, classes: 'selection-selected' },
    { data: { id: '121', label: 'Product', parent: 'mongodb' }, position: { x: 400, y: 200 }, classes: 'selection-selected' },
    { data: { id: '123', label: 'Name', parent: 'mongodb' }, position: { x: 500, y: 300 }, classes: 'selection-root' },
    { data: { id: '122', label: 'Id', parent: 'mongodb' }, position: { x: 400, y: 300 } },
    { data: { id: '124', label: 'Price', parent: 'mongodb' }, position: { x: 500, y: 200 } },

    // Edges
    { data: { source: '100', target: '101', label: '1' } },
    { data: { source: '100', target: '102', label: '3' } },
    { data: { source: '100', target: '104', label: '7' } },
    { data: { source: '110', target: '100', label: '21' } },
    { data: { source: '110', target: '111', label: '23' } },
    { data: { source: '117', target: '111', label: '36' } },
    { data: { source: '117', target: '121', label: '39' } },
    { data: { source: '121', target: '122', label: '47' } },
    { data: { source: '121', target: '123', label: '49' } },
    { data: { source: '121', target: '124', label: '51' } },
    { data: { source: '111', target: '112', label: '25' } },
    { data: { source: '111', target: '113', label: '27' } },
    { data: { source: '113', target: '116', label: '33' } },
    { data: { source: '113', target: '114', label: '29' } },
    { data: { source: '114', target: '115', label: '31' } },
];

const elements_query1: ElementDefinition[] = [
    // Databases
    { data: { id: 'mongodb', label: 'MongoDB' }, classes: 'group group-1' },
    { data: { id: 'neo4j', label: 'Neo4j' }, classes: 'group group-4' },

    // Nodes
    { data: { id: '100', label: 'Customer', parent: 'neo4j' }, position: { x: 100, y: 0 }, classes: 'selection-root' },
    { data: { id: '102', label: 'Name', parent: 'neo4j' }, position: { x: 0, y: 0 }, classes: 'selection-root availability-ambiguous' },
    { data: { id: '110', label: 'Orders', parent: 'neo4j' }, position: { x: 200, y: 0 }, classes: 'selection-selected' },
    { data: { id: '111', label: 'Order', parent: 'neo4j' }, position: { x: 300, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'Mongodb111', label: undefined, parent: 'mongodb' }, position: { x: 300, y: 0 }, classes: 'group-placeholder' },
    { data: { id: '117', label: 'Items', parent: 'mongodb' }, position: { x: 300, y: 100 }, classes: 'selection-selected' },
    { data: { id: '121', label: 'Product', parent: 'mongodb' }, position: { x: 300, y: 200 }, classes: 'selection-selected' },
    { data: { id: '123', label: 'Name', parent: 'mongodb' }, position: { x: 300, y: 300 }, classes: 'selection-root' },

    // Edges
    { data: { source: '100', target: '102', label: '3' } },
    { data: { source: '110', target: '100', label: '21' } },
    { data: { source: '110', target: '111', label: '23' } },
    { data: { source: '117', target: '111', label: '36' } },
    { data: { source: '117', target: '121', label: '39' } },
    { data: { source: '121', target: '123', label: '49' } },
];

const elements_query2: ElementDefinition[] = [
    // Databases
    { data: { id: 'mongodb', label: 'MongoDB' }, classes: 'group group-1' },
    { data: { id: 'cassandra', label: 'Cassandra' }, classes: 'group group-2' },
    { data: { id: 'postgres', label: 'PostgreSQL' }, classes: 'group group-3' },

    // TODO: edit this example according to the images
    // Nodes
    { data: { id: '100', label: 'Customer', parent: 'cassandra' }, position: { x: 0, y: 0 }, classes: 'selection-root' },
    { data: { id: 'Postgres100', label: undefined, parent: 'postgres' }, position: { x: 0, y: 0 }, classes: 'group-placeholder' },
    { data: { id: '102', label: 'Name', parent: 'postgres' }, position: { x: 0, y: 100 }, classes: 'selection-root availability-ambiguous' },
    { data: { id: '110', label: 'Orders', parent: 'cassandra' }, position: { x: 100, y: 0 }, classes: 'selection-selected' },
    { data: { id: '111', label: 'Order', parent: 'cassandra' }, position: { x: 200, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'Mongodb111', label: 'Order', parent: 'mongodb' }, position: { x: 200, y: 0 }, classes: 'group-placeholder' },
    { data: { id: '117', label: 'Items', parent: 'mongodb' }, position: { x: 200, y: 100 }, classes: 'selection-selected' },
    { data: { id: '121', label: 'Product', parent: 'mongodb' }, position: { x: 200, y: 200 }, classes: 'selection-selected' },
    { data: { id: '123', label: 'Name', parent: 'mongodb' }, position: { x: 200, y: 300 }, classes: 'selection-root' },

    // Edges
    { data: { source: '100', target: '102', label: '3' } },
    { data: { source: '110', target: '100', label: '21' } },
    { data: { source: '110', target: '111', label: '23' } },
    { data: { source: '117', target: '111', label: '36' } },
    { data: { source: '117', target: '121', label: '39' } },
    { data: { source: '121', target: '123', label: '49' } },
];

const elements_schema: ElementDefinition[] = [
    // Databases
    { data: { id: 'mongodb', label: 'MongoDB' }, classes: 'group group-1' },
    { data: { id: 'postgres', label: 'PostgreSQL' }, classes: 'group group-3' },

    // Nodes
    { data: { id: 'address', label: 'Address', parent: 'postgres' }, position: { x: 150, y: 100 }, classes: 'selection-selected' },
    { data: { id: 'mongoaddress', label: undefined, parent: 'mongodb' }, position: { x: 100, y: 100 }, classes: 'group-placeholder' },

    { data: { id: 'legalEntity', label: 'Legal Entity', parent: 'mongodb' }, position: { x: 450, y: 100 }, classes: 'selection-root' },
    { data: { id: 'identifier', label: 'Identifier', parent: 'mongodb' }, position: { x: 450, y: 200 } },
    { data: { id: 'organization', label: 'Organization', parent: 'mongodb' }, position: { x: 600, y: 100 } },
    { data: { id: 'foundingDate', label: 'foundingDate', parent: 'mongodb' }, position: { x: 600, y: 0 } },

    { data: { id: 'addressArea', label: 'address area', parent: 'postgres' }, position: { x: -200, y: 200 }, classes: 'selection-selected' },
    { data: { id: 'addressAreaLang', label: 'address area_language', parent: 'postgres' }, position: { x: -300, y: 150 }, classes: 'selection-selected availability-ambiguous' },
    { data: { id: 'addressAreaValue', label: 'address area_value', parent: 'postgres' }, position: { x: -300, y: 250 }, classes: 'selection-root' },

    { data: { id: 'postCode', label: 'post code', parent: 'postgres' }, position: { x: -200, y: 100 } },

    { data: { id: 'postName', label: 'post name', parent: 'postgres' }, position: { x: 100, y: 300 }, classes: 'selection-selected' },
    { data: { id: 'postNameLang', label: 'post name_language', parent: 'postgres' }, position: { x: 220, y: 400 }, classes: 'selection-selected availability-ambiguous' },
    { data: { id: 'postNameValue', label: 'post name_value', parent: 'postgres' }, position: { x: 50, y: 400 }, classes: 'selection-root' },

    { data: { id: 'adminLevel1', label: 'administrative unit level 1', parent: 'postgres' }, position: { x: -100, y: 250 } },
    { data: { id: 'adminLevel1Lang', label: 'administrative unit level 1_language', parent: 'postgres' }, position: { x: -50, y: 350 } },
    { data: { id: 'adminLevel1Value', label: 'administrative unit level 1_value', parent: 'postgres' }, position: { x: -200, y: 380 } },

    { data: { id: 'adminLevel2', label: 'administrative unit level 2', parent: 'postgres' }, position: { x: -100, y: -50 } },
    { data: { id: 'adminLevel2Lang', label: 'administrative unit level 2_language', parent: 'postgres' }, position: { x: -50, y: -150 } },
    { data: { id: 'adminLevel2Value', label: 'administrative unit level 2_value', parent: 'postgres' }, position: { x: -200, y: -180 } },

    { data: { id: 'thoroughfare', label: 'thoroughfare', parent: 'postgres' }, position: { x: 100, y: -200 } },
    { data: { id: 'thoroughfareLang', label: 'thoroughfare_language', parent: 'postgres' }, position: { x: 220, y: -300 } },
    { data: { id: 'thoroughfareValue', label: 'thoroughfare_value', parent: 'postgres' }, position: { x: 50, y: -300 } },

    { data: { id: 'legalName', label: 'legal name', parent: 'mongodb' }, position: { x: 450, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'legalNameLang', label: 'legal name_language', parent: 'mongodb' }, position: { x: 550, y: -100 }, classes: 'selection-selected availability-ambiguous' },
    { data: { id: 'legalNameValue', label: 'legal name_value', parent: 'mongodb' }, position: { x: 400, y: -100 }, classes: 'selection-root' },

    { data: { id: 'notation', label: 'notation', parent: 'mongodb' }, position: { x: 600, y: 200 } },
    { data: { id: 'locator', label: 'locator designator', parent: 'postgres' }, position: { x: -200, y: 0 } },


    // Edges
    { data: { source: 'legalEntity', target: 'organization', label: '1 - #isa' } },
    { data: { source: 'legalName', target: 'legalNameLang', label: '2' } },
    { data: { source: 'legalName', target: 'legalNameValue', label: '3' } },
    { data: { source: 'legalEntity', target: 'legalName', label: '4' } },
    { data: { source: 'organization', target: 'foundingDate', label: '5' } },
    { data: { source: 'identifier', target: 'notation', label: '6' } },
    { data: { source: 'addressArea', target: 'addressAreaLang', label: '7' } },
    { data: { source: 'addressArea', target: 'addressAreaValue', label: '8' } },
    { data: { source: 'address', target: 'addressArea', label: '9' } },
    { data: { source: 'address', target: 'postCode', label: '10' } },
    { data: { source: 'postName', target: 'postNameLang', label: '11' } },
    { data: { source: 'postName', target: 'postNameValue', label: '12' } },
    { data: { source: 'address', target: 'postName', label: '13' } },
    { data: { source: 'address', target: 'locator', label: '14' } },
    { data: { source: 'adminLevel1', target: 'adminLevel1Lang', label: '15' } },
    { data: { source: 'adminLevel1', target: 'adminLevel1Value', label: '16' } },
    { data: { source: 'address', target: 'adminLevel1', label: '17' } },
    { data: { source: 'adminLevel2', target: 'adminLevel2Lang', label: '18' } },
    { data: { source: 'adminLevel2', target: 'adminLevel2Value', label: '19' } },
    { data: { source: 'address', target: 'adminLevel2', label: '20' } },
    { data: { source: 'thoroughfare', target: 'thoroughfareLang', label: '21' } },
    { data: { source: 'thoroughfare', target: 'thoroughfareValue', label: '22' } },
    { data: { source: 'address', target: 'thoroughfare', label: '23' } },
    { data: { source: 'legalEntity', target: 'identifier', label: '24 - Identifier' } },
    { data: { source: 'legalEntity', target: 'address', label: '25 - registered address' } },
];

const CategoryGraph = (props: CategoryGraphProps) => {
    const [cy, setCy] = useState((undefined) as Core | undefined);
    useEffect(() => {
        // We have to check if cytoscape is already destroyed, otherwise it throws an error
        if (cy && !cy.destroyed()) {
            // TODO: Uncomment this when implementing with real data
            // props.schemaCategory.renderToCytoscape(cy);
            cy.fit();
        }
    });

    let elements: ElementDefinition[] = [];
    if (props.contentKind === ContentKind.Schema) {
        elements = elements_schema;
    } else if (props.contentKind === ContentKind.Query1) {
        elements = elements_query1;
    } else {
        elements = elements_query2;
    }

    return <CytoscapeComponent id="cy"
        elements={elements}
        style={{ width: '100%', height: '100%', borderWidth: '2px', borderColor: 'black', borderStyle: 'solid' }}
        stylesheet={cytoscapeStylesheet}
        autoungrabify={true}
        cy={cy => { setCy(cy) }}
    />;
}

export default CategoryGraph
