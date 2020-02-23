import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import Booking from "../components/booking";

export default ({ location, data }) => {
  const event = data.eventsYaml;
  const logo = data.allFile.nodes.find(
    file => file.name === event.eventId.toLowerCase()
  );
  return (
    <Layout location={location}>
      <SEO title={event.eventName} description={event.eventShortDescription} />
      <div className="container px-4 sm:mx-auto my-6 md:my-12">
        <Img
          className="mb-4 mx-auto block"
          fixed={logo.childImageSharp.fixed}
          alt={`${event.eventName} Logo`}
          style={{ display: "inherit" }}
        />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-primary-800 font-medium text-center mb-8">
          {event.eventName}
        </h1>
        <ReactMarkdown className="markdown max-w-screen-md mx-auto">
          {event.eventDescription}
        </ReactMarkdown>
        <section className="max-w-screen-md mx-auto">
          <h2 className="text-lg font-medium mb-2">สิ่งที่จะได้กลับไป</h2>
          <ReactMarkdown className="markdown ml-4">
            {event.eventWill}
          </ReactMarkdown>
        </section>
        {event.rounds && <Booking event={event} />}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($eventPath: String) {
    eventsYaml(eventPath: { eq: $eventPath }) {
      eventId
      eventName
      eventShortDescription
      eventDescription
      eventWill
      roundInfo {
        name
        capacity
        booking
        duration
        preDuration
      }
      rounds {
        id
        startTime
      }
    }
    allFile(filter: { relativeDirectory: { eq: "events" } }) {
      nodes {
        childImageSharp {
          fixed(quality: 75, width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
        name
      }
    }
  }
`;
