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
    { data: { id: 'owlThing', label: 'owl:Thing', parent: 'postgres' }, position: { x: 100, y: 100 }, classes: 'selection-selected' },
    { data: { id: 'mongoOwlThing', label: undefined, parent: 'mongodb' }, position: { x: 100, y: 100 }, classes: 'group-placeholder' },

    { data: { id: 'legalEntity', label: 'Legal Entity', parent: 'mongodb' }, position: { x: 800, y: 100 }, classes: 'selection-root' },
    { data: { id: 'identifier', label: 'Identifier', parent: 'mongodb' }, position: { x: 450, y: 100 } },
    { data: { id: 'organization', label: 'Organization', parent: 'mongodb' }, position: { x: 800, y: 0 } },
    { data: { id: 'foundingDate', label: 'FoundingDate', parent: 'postgres' }, position: { x: 800, y: -100 } },
    { data: { id: 'mongoFoundingDate', label: undefined, parent: 'mongodb' }, position: { x: 800, y: -100 }, classes: 'group-placeholder' },
    { data: { id: 'formalOrganization', label: 'Formal Organization', parent: 'mongodb' }, position: { x: 650, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'isaOrganization', label: 'Organization', parent: 'mongodb' }, position: { x: 450, y: 0 }, classes: 'selection-selected' },
    { data: { id: 'blankOrganization', label: '', parent: 'mongodb' }, position: { x: 300, y: 0 }, classes: 'selection-selected' },

    { data: { id: 'address', label: 'Address', parent: 'postgres' }, position: { x: 350, y: 150 } },

    { data: { id: 'addressArea', label: 'address area', parent: 'mongodb' }, position: { x: 300, y: 300 }, classes: 'selection-selected' },
    { data: { id: 'addressAreaLang', label: '_language', parent: 'mongodb' }, position: { x: 350, y: 400 }, classes: 'selection-selected availability-ambiguous' },
    { data: { id: 'addressAreaValue', label: '_value', parent: 'postgres' }, position: { x: 250, y: 400 }, classes: 'selection-root' },
    { data: { id: 'mongoAddressAreaValue', label: undefined, parent: 'mongodb' }, position: { x: 250, y: 400 }, classes: 'group-placeholder' },

    { data: { id: 'postCode', label: 'post code', parent: 'mongodb' }, position: { x: 200, y: 300 } },

    { data: { id: 'postNameCity', label: 'post name (city)', parent: 'mongodb' }, position: { x: 100, y: 300 }, classes: 'selection-selected' },
    { data: { id: 'postNameCityLang', label: '_language', parent: 'mongodb' }, position: { x: 150, y: 400 }, classes: 'selection-selected availability-ambiguous' },
    { data: { id: 'postNameCityValue', label: '_value', parent: 'mongodb' }, position: { x: 50, y: 400 }, classes: 'selection-root' },

    { data: { id: 'adminLevel1', label: 'administrative unit level 1 (country)', parent: 'mongodb' }, position: { x: -100, y: 200 } },
    { data: { id: 'adminLevel1Lang', label: '_language', parent: 'mongodb' }, position: { x: -50, y: 300 } },
    { data: { id: 'adminLevel1Value', label: '_value', parent: 'postgres' }, position: { x: -150, y: 300 } },
    { data: { id: 'mongoAdminLevel1Value', label: undefined, parent: 'mongodb' }, position: { x: -150, y: 300 }, classes: 'group-placeholder' },

    { data: { id: 'adminLevel2', label: 'administrative unit level 2 (country/region/state)', parent: 'mongodb' }, position: { x: -100, y: -100 } },
    { data: { id: 'adminLevel2Lang', label: '_language', parent: 'mongodb' }, position: { x: -50, y: -200 } },
    { data: { id: 'adminLevel2Value', label: '_value', parent: 'postgres' }, position: { x: -150, y: -200 } },
    { data: { id: 'mongoAdminLevel2Value', label: undefined, parent: 'mongodb' }, position: { x: -150, y: -200 }, classes: 'group-placeholder' },

    { data: { id: 'thoroughfare', label: 'thoroughfare', parent: 'mongodb' }, position: { x: 100, y: -200 } },
    { data: { id: 'thoroughfareLang', label: '_language', parent: 'mongodb' }, position: { x: 150, y: -300 } },
    { data: { id: 'thoroughfareValue', label: '_value', parent: 'postgres' }, position: { x: 50, y: -300 } },
    { data: { id: 'mongoThoroughfareValue', label: undefined, parent: 'mongodb' }, position: { x: 50, y: -300 }, classes: 'group-placeholder' },

    { data: { id: 'legalName', label: 'legal name', parent: 'mongodb' }, position: { x: 300, y: -200 }, classes: 'selection-selected' },
    { data: { id: 'legalNameLang', label: '_language', parent: 'mongodb' }, position: { x: 350, y: -300 }, classes: 'selection-selected availability-ambiguous' },
    { data: { id: 'legalNameValue', label: '_value', parent: 'mongodb' }, position: { x: 250, y: -300 }, classes: 'selection-root' },

    { data: { id: 'notation', label: 'notation', parent: 'mongodb' }, position: { x: -300, y: 100 } },
    { data: { id: 'locator', label: 'locator designator', parent: 'mongodb' }, position: { x: -300, y: 0 } },


    // Edges
    { data: { source: 'legalEntity', target: 'formalOrganization', label: '1 - #isa' } },
    { data: { source: 'legalEntity', target: 'organization', label: '2 - #isa' } },
    { data: { source: 'blankOrganization', target: 'owlThing', label: '3 - #isa' } },
    { data: { source: 'isaOrganization', target: 'blankOrganization', label: '4 - #isa' } },
    { data: { source: 'formalOrganization', target: 'isaOrganization', label: '5 - #isa' } },
    { data: { source: 'identifier', target: 'owlThing', label: '6 - #isa' } },
    { data: { source: 'address', target: 'owlThing', label: '7 - #isa' } },
    { data: { source: 'organization', target: 'foundingDate', label: '8' } },
    { data: { source: 'addressArea', target: 'addressAreaLang', label: '9' } },
    { data: { source: 'addressArea', target: 'addressAreaValue', label: '10' } },
    { data: { source: 'owlThing', target: 'addressArea', label: '11' } },
    { data: { source: 'owlThing', target: 'postCode', label: '12' } },
    { data: { source: 'postNameCity', target: 'postNameCityLang', label: '13' } },
    { data: { source: 'postNameCity', target: 'postNameCityValue', label: '14' } },
    { data: { source: 'owlThing', target: 'postNameCity', label: '15' } },
    { data: { source: 'owlThing', target: 'locator', label: '16' } },
    { data: { source: 'adminLevel1', target: 'adminLevel1Lang', label: '17' } },
    { data: { source: 'adminLevel1', target: 'adminLevel1Value', label: '18' } },
    { data: { source: 'owlThing', target: 'adminLevel1', label: '19' } },
    { data: { source: 'adminLevel2', target: 'adminLevel2Lang', label: '20' } },
    { data: { source: 'adminLevel2', target: 'adminLevel2Value', label: '21' } },
    { data: { source: 'owlThing', target: 'adminLevel2', label: '22' } },
    { data: { source: 'thoroughfare', target: 'thoroughfareLang', label: '23' } },
    { data: { source: 'thoroughfare', target: 'thoroughfareValue', label: '24' } },
    { data: { source: 'owlThing', target: 'thoroughfare', label: '25' } },
    { data: { source: 'owlThing', target: 'notation', label: '26' } },
    { data: { source: 'legalName', target: 'legalNameLang', label: '27' } },
    { data: { source: 'legalName', target: 'legalNameValue', label: '28' } },
    { data: { source: 'owlThing', target: 'legalName', label: '29' } },
    { data: { source: 'owlThing', target: 'owlThing', label: '30 - registered address' } },
    { data: { source: 'legalEntity', target: 'identifier', label: '31 - Identifier' } },
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
