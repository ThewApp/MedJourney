import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
export default ({ data }) => {
  const event = data.eventsJson;
  return (
    <Layout>
      <h1>Hello {event.eventName}</h1>
      <p>{event.eventDescription}</p>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String) {
    eventsJson(eventId: { eq: $slug }) {
      eventName
      eventDescription
    }
  }
`;
