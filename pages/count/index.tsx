import React from 'react';

function CountPage() {
  return <div>CountPage</div>;
}

// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndexLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemapIndexLegacy(ctx, [
    'http://localhost:3003/path-1.xml',
    'http://localhost:3003/path-2.xml'
  ]);
};

// Default export to prevent next.js errors

export default CountPage;
