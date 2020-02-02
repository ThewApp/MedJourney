import React from "react";
import { Link, graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";

function EventCard({ event, className }) {
  return (
    <Link
      to={`/events/${event.eventPath}`}
      key={event.id}
      className={"block p-4 shadow-md rounded-sm " + className}
    >
      <h3 className="sm:text-lg text-primary-600 font-medium mb-2">
        {event.eventName}
      </h3>
      <ReactMarkdown className="text-sm md:text-base markdown text-gray-800">
        {event.eventShortDescription}
      </ReactMarkdown>
    </Link>
  );
}

export default ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO
        title="กิจกรรม"
        description="กิจกรรมสุดพิเศษ 20 กิจกรรมภายในงานตลอด 2 วันเต็ม"
      />
      <div className="flex items-center my-6 md:my-12 mx-5 md:mx-24">
        <div className="">
          <h1 className="text-2xl md:text-4xl font-medium">กิจกรรม</h1>
          <p className="md:text-lg">
            พบกับกิจกรรมสุดพิเศษ 20 กิจกรรมนี้ได้ ภายในงานตลอด 2 วันเต็ม
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-around container mx-auto">
        {data.allEventsYaml.nodes.map(node => (
          <EventCard className="w-full md:w-5/12 m-3 sm:m-6" event={node} />
        ))}
      </div>
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
