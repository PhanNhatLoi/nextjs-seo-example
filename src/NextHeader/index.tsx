import React from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';
import { SITE_URL } from '@/app/config';
import { useRouter } from 'next/router';

type Props = {
  seoProps?: NextSeoProps;
};
function NextHeader(props: Props) {
  const { seoProps = {} } = props;
  const router = useRouter();
  const currentPage = router.asPath.replace('/', '').split('/');
  const title = router.asPath === '/' ? 'Home page' : currentPage.join(' - ');

  const defaultProps: NextSeoProps = {
    title: `${title} | LearnDev | IT99`,
    description:
      'Welcome to the channel "LearnDev99". Here you will be able to watch videos with content surrounding building a website. Includes html css tutorials, css animation and css effects, javascript and jquery tutorials...Knowledge related to css effect, Web design ideas, TypeScript, ReactJs, NextJs, dev tips...',
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: SITE_URL,
      siteName: 'LearnDev'
    }
  };

  return (
    <NextSeo
      additionalLinkTags={[
        {
          rel: 'shortcut icon',
          href: '/images/logo.png'
        }
      ]}
      {...defaultProps}
      {...seoProps}
    />
  );
}

export default NextHeader;
