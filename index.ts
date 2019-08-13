import { gql } from 'apollo-boost';
import { Credentials, GraphQLConfig, User } from 'realm-graphql-client';

async function main() {
  const credentials = Credentials.usernamePassword('USERNAME', 'PASSWORD');
  
  try {
    const user = await User.authenticate(credentials, 'https://power-9.us1.cloud.realm.io');

    const config = await GraphQLConfig.create( 
      user,
      'scryfall'
    );

    const client = config.createApolloClient();

    // You can now query the GraphQL API
    const response = await client.query({
      query: gql`
        query {
          cards(sortBy: "name") {
            name
          }
        }
      `
    });

    console.log(response.data.cards);
  } catch (e) {
    console.error(e);
  }
}

main();