import React from "react";
import {graphql} from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";

export default ({location, data}) => {
    const event = data.eventsYaml;
    const logo = data.allFile.nodes.find(file => file.name === event.eventId.toLowerCase());
    let roundOn21, roundOn22 = null;
    if (event.rounds) {
        roundOn21 = event.rounds.filter(round => round.startTime.startsWith("2020-03-21"));
        roundOn22 = event.rounds.filter(round => round.startTime.startsWith("2020-03-22"));
    }
    return (
        <Layout location={location}>
            <div className="flex items-center my-6 md:my-12 mx-5 md:mx-24">
                <div className="">
                    <SEO title={event.eventName} description={event.eventShortDescription}/>
                    <div className="flex items-center mb-4 py-2">
                        <Img
                            className="flex-none mr-4"
                            fixed={logo.childImageSharp.fixed}
                            alt={`${event.eventName} Logo`}
                        />
                        <h3 className="text-4xl text-primary-800 font-medium mb-2">
                            <b>{event.eventName}</b>
                        </h3>
                    </div>
                    <ReactMarkdown className="markdown">
                        {event.eventDescription}
                    </ReactMarkdown>
                    {event.rounds && (
                        <div className="py-4">
                            <div className="py-2">
                                <b className="text-2xl">{event.roundInfo.name}</b>
                            </div>
                            <div>
                                <span className="text-m">รอบละ {event.roundInfo.capacity} คน</span>
                            </div>
                        </div>
                    )}
                    {event.rounds && roundOn21.length > 0 && (
                        <div className="py-4">
                            <b className="text-l">21 มีนาคม 2563</b>
                        </div>
                    )}
                    {event.rounds && roundOn21.map(round => (
                        <div className="p-2">
                            <div className="block px-4 py-2 bg-gray-100 rounded-lg">
                                <h4 className="text-xl text-gray-900 leading-tight">{new Date(round.startTime).toLocaleTimeString("th-TH")} - {new Date(((Date.parse(round.startTime) / 1000) + (60 * event.roundInfo.duration)) * 1000).toLocaleTimeString("th-TH")}</h4>
                            </div>
                        </div>
                    ))}
                    {event.rounds && roundOn22.length > 0 && (
                        <div className="py-4">
                            <b className="text-l">22 มีนาคม 2563</b>
                        </div>
                    )}
                    {event.rounds && roundOn22.map(round => (
                        <div className="p-2">
                            <div className="block px-4 py-2 bg-gray-100 rounded-lg">
                                <h4 className="text-xl text-gray-900 leading-tight">{new Date(round.startTime).toLocaleTimeString("th-TH")} - {new Date(((Date.parse(round.startTime) / 1000) + (60 * event.roundInfo.duration)) * 1000).toLocaleTimeString("th-TH")}</h4>
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
      eventId
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
        startTime
      }
    }
    allFile(filter: { relativeDirectory: { eq: "events" } }) {
      nodes {
        childImageSharp {
          fixed(quality: 100, width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
        name
      }
    }
  }
`;
