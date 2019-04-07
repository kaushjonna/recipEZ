import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import { View } from 'react-native'
import {createHttpLink} from "apollo-link-http";
import fetch from "node-fetch";
import {InMemoryCache} from "apollo-cache-inmemory";


const getRecipes = gql`
    query {
        recipes {
            id
        }
    }
`;

export default class TestComponent extends Component{

  render() {
    return(
      <Query query={getRecipes}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <p>ERROR</p>;

          return (
            <Fragment>
              {data.id}
            </Fragment>
          );
        }}
      </Query>
    )
  }

}

