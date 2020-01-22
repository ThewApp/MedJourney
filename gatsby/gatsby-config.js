module.exports = {
  siteMetadata: {
    title: `MDCU Open House 2020 : MedJourney`,
    shortTitle: `MedJourney`,
    description: `MedJourney กิจกรรม Open House คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย 2 วันเต็ม`,
    author: `@mdcuopenhouse`,
    facebook: `https://facebook.com/mdcuopenhouse`
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`] // ignore files starting with a dot
      }
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MDCU Open House 2020 : MedJourney`,
        short_name: `MedJourney`,
        start_url: `/`,
        background_color: `#a8301a`,
        theme_color: `#5f1b1f`,
        display: `minimal-ui`,
        icon: `src/images/logo-rounded.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  proxy: {
    prefix: "/__",
    url: "http://localhost:5000"
  }
};
