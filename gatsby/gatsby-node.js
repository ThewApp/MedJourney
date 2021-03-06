/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allEventsYaml {
        nodes {
          eventId
          eventPath
        }
      }
    }
  `);
  result.data.allEventsYaml.nodes.forEach(({ eventId, eventPath }) => {
    actions.createPage({
      path: `/events/${eventPath}`,
      component: path.resolve(`./src/templates/event.js`),
      context: {
        eventPath,
        eventLogoName: eventId.toLowerCase()
      }
    });
  });
};
