import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default ({ location, data }) => {
  const event = data.eventsYaml;
  return (
    <Layout location={location}>
      <SEO title={event.eventName} />
      <h1 className="text-2xl my-2">{event.eventName}</h1>
      <p>{event.eventDescription}</p>
    </Layout>
  );
};

export const query = graphql`
  query($eventPath: String) {
    eventsYaml(eventPath: { eq: $eventPath }) {
      eventName
      eventDescription
    }
  }
`;
