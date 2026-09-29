import React from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import type MetadataType from '@theme/DocItem/Metadata';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof MetadataType>;

export default function MetadataWrapper(props: Props): React.JSX.Element {
  const {metadata, frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const url = `${siteConfig.url}${metadata.permalink}`;
  const image = `${siteConfig.url}/${siteConfig.themeConfig.image as string}`;
  const modified = metadata.lastUpdatedAt
    ? new Date(metadata.lastUpdatedAt).toISOString()
    : undefined;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: metadata.title,
    description: metadata.description,
    url,
    mainEntityOfPage: url,
    image,
    inLanguage: 'en',
    dateModified: modified,
    author: {'@type': 'Organization', name: 'Beshu Tech', url: 'https://beshu.tech'},
    publisher: {
      '@type': 'Organization',
      name: 'Beshu Tech',
      logo: {'@type': 'ImageObject', url: `${siteConfig.url}/img/logo.png`},
    },
    isPartOf: {'@type': 'WebSite', name: siteConfig.title, url: siteConfig.url},
    keywords: (frontMatter.keywords as string[] | undefined)?.join(', '),
  };
  return (
    <>
      <Head>
        <meta property="og:type" content="article" />
        {modified && <meta property="article:modified_time" content={modified} />}
        <link rel="alternate" type="text/markdown" href={`${url}.md`} />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>
      <Metadata {...props} />
    </>
  );
}
