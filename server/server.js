const { ApolloServer } = require('apollo-server');

const typeDefs = `
    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        items (type: String): [Item],
    }
`;

const items = [
    {id: 1, type: 'prefixes', description: 'Air'},
    {id: 2, type: 'prefixes', description: 'Jet'},
    {id: 3, type: 'prefixes', description: 'Flight'},
    {id: 4, type: 'sufixes', description: 'Smart'},
    {id: 5, type: 'sufixes', description: 'Station'},
    {id: 6, type: 'sufixes', description: 'Hub'}
];

const resolvers = {
    Query: {
        items (_, args) {
            return items.filter(item => item.type === args.type);
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers});

server.listen();