import React from 'react';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

const links = [
  ['/getting-started', 'Getting started'],
  ['/basic-examples', 'Basic examples'],
  ['/jobs', 'Jobs'],
  ['/delivery-interfaces', 'Delivery interfaces'],
  ['/administration', 'Administration'],
];

export default function NotFoundContent(): React.JSX.Element {
  return (
    <main className="container margin-vert--xl">
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate id="theme.NotFound.title">Page not found</Translate>
          </Heading>
          <p>This page does not exist or it moved. Try one of these sections:</p>
          <ul>
            {links.map(([to, label]) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
          <p>
            <Link to="/">Go to the documentation home</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
