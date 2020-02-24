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
          eventPath
        }
      }
    }
  `);
  result.data.allEventsYaml.nodes.forEach(({ eventPath }) => {
    actions.createPage({
      path: `/events/${eventPath}`,
      component: path.resolve(`./src/templates/event.js`),
      context: {
        eventPath
      }
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === "build-javascript") {
    actions.setWebpackConfig({
      externals: {
        react: "React",
        "react-dom": "ReactDOM"
      }
    });
  }
};
