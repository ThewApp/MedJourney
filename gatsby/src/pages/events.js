import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="กิจกรรม"/>
      <h1 className="text-2xl my-2">Amazing Events</h1>
      {data.allEventsYaml.nodes.map(node => (
          <Link to={`/events/${node.eventPath}`} key={node.id} className="block my-2">
            <h3 className="text-xl">{node.eventName}</h3>
            <p>{node.eventShortDescription}</p>
          </Link>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allEventsYaml {
      nodes {
        id
        eventName
        eventPath
        eventShortDescription
      }
    }
  }
`;
