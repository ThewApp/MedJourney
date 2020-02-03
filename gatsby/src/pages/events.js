import React from "react";
import { Link, graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";

function EventCard({ event, className }) {
  return (
    <div className={"p-4 shadow-md rounded-sm flex flex-col " + className}>
      <h3 className="text-lg text-primary-800 font-medium mb-3">
        {event.eventName}
      </h3>
      <ReactMarkdown className="markdown text-gray-800 mb-3">
        {event.eventShortDescription}
      </ReactMarkdown>
      <div className="mt-auto">
        {event.roundInfo && (
          <div className="text-secondary-700 mb-3">
            <p>กิจกรรมนี้มีการเปิดเป็นรอบ</p>
            <span className="inline-flex items-center">
              <svg
                className="fill-current mr-2 h-4 inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 97.16 97.16"
              >
                <path d="M48.58 0C21.793 0 0 21.793 0 48.58s21.793 48.58 48.58 48.58 48.58-21.793 48.58-48.58S75.367 0 48.58 0zm0 86.823c-21.087 0-38.244-17.155-38.244-38.243S27.493 10.337 48.58 10.337 86.824 27.492 86.824 48.58 69.667 86.823 48.58 86.823z" />
                <path d="M73.898 47.08H52.066V20.83a4 4 0 00-8 0v30.25a4 4 0 004 4h25.832a4 4 0 000-8z" />
              </svg>
              รอบละ {event.roundInfo.duration} นาที
            </span>
          </div>
        )}
        <Link
          to={`/events/${event.eventPath}`}
          key={event.id}
          className="text-primary-600 flex items-center justify-end"
        >
          รายละเอียด
          <svg
            className="fill-current ml-2 h-3 inline"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 268.8 268.8"
          >
            <path d="M265 126l-80-80a13 13 0 00-18 17l59 59H13a13 13 0 000 25h213l-59 59a12 12 0 1018 17l80-80c5-5 5-13 0-17z" />
          </svg>
        </Link>
      </div>
    </div>
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
      <div className="flex flex-wrap justify-center">
        {data.allEventsYaml.nodes.map(node => (
          <EventCard
            className="w-full sm:w-5/12 max-w-xl mx-2 my-3 sm:m-6"
            event={node}
          />
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
        roundInfo {
          duration
        }
      }
    }
  }
`;
