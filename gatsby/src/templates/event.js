import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default ({ location, data }) => {
  const event = data.eventsYaml;
  return (
    <Layout location={location}>
      <SEO title={event.eventName} description={event.eventShortDescription} />
      <h1 className="text-2xl my-2">{event.eventName}</h1>
      <ReactMarkdown className="markdown">
        {event.eventDescription}
      </ReactMarkdown>
    </Layout>
  );
};

export const query = graphql`
  query($eventPath: String) {
    eventsYaml(eventPath: { eq: $eventPath }) {
      eventName
      eventShortDescription
      eventDescription
    }
  }
`;
