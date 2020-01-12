/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allEventsJson {
        nodes {
          eventPath
          eventName
          eventId
        }
      }
    }
  `);
  result.data.allEventsJson.nodes.forEach(
    ({ eventPath, eventName, eventId }) => {
      actions.createPage({
        path: `/events/${eventPath}`,
        component: path.resolve(`./src/templates/event.js`),
        context: {
          slug: eventId
        }
      });
    }
  );
};
