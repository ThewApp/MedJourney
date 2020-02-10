import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";

function RoundList({ rounds, duration }) {
  return rounds.map(round => {
    const startTimeString = new Date(
      round.startTime.replace(" ", "T")
    ).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit"
    });
    const endTimeString = new Date(
      (Date.parse(round.startTime.replace(" ", "T")) / 1000 + 60 * duration) *
        1000
    ).toLocaleTimeString("th-TH", { hour: "numeric", minute: "numeric" });
    return (
      <ul
        className="block px-4 py-2 bg-gray-100 rounded mb-2 mx-4"
        key={round.id}
      >
        <li className="text-gray-900 leading-tight">
          {startTimeString} - {endTimeString}
        </li>
      </ul>
    );
  });
}

export default ({ location, data }) => {
  const event = data.eventsYaml;
  const logo = data.allFile.nodes.find(
    file => file.name === event.eventId.toLowerCase()
  );
  let roundOn21,
    roundOn22 = null;
  if (event.rounds) {
    roundOn21 = event.rounds.filter(round =>
      round.startTime.startsWith("2020-03-21")
    );
    roundOn22 = event.rounds.filter(round =>
      round.startTime.startsWith("2020-03-22")
    );
  }
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
        {event.rounds && (
          <section className="py-4 max-w-screen-md mx-auto">
            <h2 className="text-lg font-medium mb-2">
              กิจกรรมย่อย : {event.roundInfo.name}
            </h2>
            <p>รอบละ {event.roundInfo.capacity} คน</p>
            <div className="flex flex-wrap my-2 justify-around">
              <article className="w-full md:w-1/2">
                <h3 className="mb-2 font-medium">21 มีนาคม 2563</h3>
                <RoundList
                  rounds={roundOn21}
                  duration={event.roundInfo.duration}
                />
              </article>
              <article className="w-full md:w-1/2">
                <h3 className="mb-2 font-medium">22 มีนาคม 2563</h3>
                <RoundList
                  rounds={roundOn22}
                  duration={event.roundInfo.duration}
                />
              </article>
            </div>
            <div className="text-xl md:text-2xl my-8 text-center text-primary-600 font-medium">
              เปิดให้จอง 26 - 29 กุมภาพันธ์นี้
            </div>
          </section>
        )}
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
        duration
        requirements
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
