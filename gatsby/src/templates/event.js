import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default ({ location, data }) => {
  const event = data.eventsYaml;
  return (
    <Layout location={location}>
        <div className="flex items-center my-6 md:my-12 mx-5 md:mx-24">
            <div className="">
                <SEO title={event.eventName} description={event.eventShortDescription} />
                <h1 className="text-3xl my-2 text-primary-800"><b>{event.eventName}</b></h1>
                <ReactMarkdown className="markdown">
                    {event.eventDescription}
                </ReactMarkdown>
                {event.rounds && event.rounds.map(round => (
                    <div className="p-4">
                        <div className="block px-4 py-2 bg-gray-100 rounded-lg">
                            <h4 className="text-xl text-gray-900 leading-tight">{event.roundInfo.name} รอบที่ {round.id}</h4>
                            <p className="text-base text-gray-600 leading-normal">{new Date(round.startTime).toLocaleString()} - {new Date(((Date.parse(round.startTime) / 1000) + (60 * event.roundInfo.duration)) * 1000).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  );
};

export const query = graphql`
  query($eventPath: String) {
    eventsYaml(eventPath: { eq: $eventPath }) {
      eventName
      eventShortDescription
      eventDescription
      roundInfo {
        name
        capacity
        duration
        requirements
      }
      rounds {
        id
        startTime
      }
    }
  }
`;
