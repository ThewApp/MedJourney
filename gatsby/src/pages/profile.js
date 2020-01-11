import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Cover from "../components/cover";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Profile" />
      <Cover />
    </Layout>
  );
};

export default IndexPage;
