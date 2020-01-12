import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
export default ({ data }) => {
  return (
    <Layout>
      <h1>Amazing Events</h1>
      {data.allEventsJson.nodes.map(node => (
        <div key={node.id}>
          <Link to={`/events/${node.eventPath}`}>
            <h3>{node.eventName}</h3>
          </Link>
        </div>
      ))}
    </Layout>
  );
};
export const query = graphql`
  query {
    allEventsJson {
      nodes {
        id
        eventName
        eventPath
      }
    }
  }
`;
