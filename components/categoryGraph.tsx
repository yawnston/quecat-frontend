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

type SchemaObjectInfo = {
    key: number
    is_in_projection: boolean
    is_in_query: boolean
    is_in_filter: boolean
    is_in_aggregation: boolean
    database_ids: string[]
}

type CategoryGraphProps = {
    schemaCategory: SchemaCategory | undefined,
    contentKind: ContentKind,
    objectInfos: SchemaObjectInfo[]
}

const DB_NAMES: { [databaseId: string]: string } = {
    '1': 'mongodb',
    '2': 'postgres'
}

const addElementMetadata = (elements: ElementDefinition[], objectInfos: SchemaObjectInfo[]) => {
    const elementsCopy = JSON.parse(JSON.stringify(elements));

    if (!objectInfos) {
        return elementsCopy;
    }

    for (const obj of objectInfos) {
        console.log(obj);
        const elem = elements.find(x => x.data.id === obj.key.toString());

        let style = '';
        if (obj.is_in_projection) {
            style = style.concat(' selection-root');
        } else if (obj.is_in_query) {
            style = style.concat(' selection-selected');
        }

        if (obj.is_in_filter) {
            style = style.concat(' availability-ambiguous');
        }
        if (obj.is_in_aggregation) {
            style = style.concat(' availability-available');
        }

        elem!.classes = style;

        for (const db of obj.database_ids) {
            elements.push(
                {
                    data: { id: `${elem!.data.id}_${db}`, parent: DB_NAMES[db] },
                    position: elem!.position,
                    classes: 'group-placeholder'
                }
            )
        }
    }

    return elementsCopy;
}

// I tried looking at Unibench queries to maybe represent those, but:
//  - there is not much redundancy in the Unibench model
//  - the model is not that well specified (IMO)
//  - I would need to transform the model to category representation
const elements_schema: ElementDefinition[] = [
    // Databases
    { data: { id: 'mongodb', label: 'MongoDB' }, classes: 'group group-1' },
    { data: { id: 'postgres', label: 'PostgreSQL' }, classes: 'group group-3' },

    // Nodes
    { data: { id: '1', label: 'Customer' }, position: { x: 100, y: 100 } },
    { data: { id: '2', label: 'Id' }, position: { x: 100, y: 0 } },
    { data: { id: '3', label: 'Name' }, position: { x: 0, y: 100 } },
    { data: { id: '4', label: 'Surname' }, position: { x: 0, y: 200 } },
    { data: { id: '5', label: 'Address' }, position: { x: 100, y: 400 } },
    { data: { id: '6', label: 'Id' }, position: { x: 0, y: 400 } },
    { data: { id: '7', label: 'Street' }, position: { x: 0, y: 500 } },
    { data: { id: '8', label: 'City' }, position: { x: 100, y: 500 } },
    { data: { id: '9', label: 'PostalCode' }, position: { x: 200, y: 500 } },
    { data: { id: '10', label: 'Order' }, position: { x: 300, y: 0 } },
    { data: { id: '11', label: 'Id' }, position: { x: 300, y: -100 } },
    { data: { id: '12', label: 'Items' }, position: { x: 400, y: 100 } },
    { data: { id: '13', label: 'Quantity' }, position: { x: 500, y: 100 } },
    { data: { id: '14', label: 'Product' }, position: { x: 400, y: 200 } },
    { data: { id: '15', label: 'Id' }, position: { x: 300, y: 200 } },
    { data: { id: '16', label: 'Name' }, position: { x: 300, y: 300 } },
    { data: { id: '17', label: 'Price' }, position: { x: 400, y: 300 } },

    // Edges
    { data: { source: '1', target: '2', label: '1' } },
    { data: { source: '1', target: '3', label: '2' } },
    { data: { source: '1', target: '4', label: '3' } },
    { data: { source: '1', target: '5', label: '4' } },
    { data: { source: '5', target: '6', label: '5' } },
    { data: { source: '5', target: '7', label: '6' } },
    { data: { source: '5', target: '8', label: '7' } },
    { data: { source: '5', target: '9', label: '8' } },
    { data: { source: '10', target: '1', label: '9' } },
    { data: { source: '10', target: '11', label: '10' } },
    { data: { source: '10', target: '12', label: '11' } },
    { data: { source: '12', target: '13', label: '12' } },
    { data: { source: '12', target: '14', label: '13' } },
    { data: { source: '14', target: '15', label: '14' } },
    { data: { source: '14', target: '16', label: '15' } },
    { data: { source: '14', target: '17', label: '16' } },
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

const CategoryGraph = (props: CategoryGraphProps) => {
    const [cy, setCy] = useState((undefined) as Core | undefined);

    let elements: ElementDefinition[] = [];
    if (props.contentKind === ContentKind.Schema) {
        elements = elements_schema;
    } else if (props.contentKind === ContentKind.Query1) {
        elements = elements_query1;
    } else {
        elements = elements_query2;
    }

    elements = addElementMetadata(elements, props.objectInfos);

    console.error('Redrawing')

    useEffect(() => {
        // We have to check if cytoscape is already destroyed, otherwise it throws an error
        if (cy && !cy.destroyed()) {
            // TODO: Uncomment this when implementing with real data
            // props.schemaCategory.renderToCytoscape(cy);
            cy.fit();
            cy.json(elements);
        }
    });

    return <CytoscapeComponent id="cy"
        elements={[...elements]}
        style={{ width: '100%', height: '100%', borderWidth: '2px', borderColor: 'black', borderStyle: 'solid' }}
        stylesheet={cytoscapeStylesheet}
        autoungrabify={true}
        cy={cy => { setCy(cy) }}
    />;
}

export default CategoryGraph
