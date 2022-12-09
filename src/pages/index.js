import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';

const features = [
  {
    title: 'Easy Automation',
    imageUrl: '',
    description: (
      <>
        Write automation scripts to files in many storage locations.
      </>
    ),
  },
  {
    title: 'Supports Multiple Protocols',
    imageUrl: '',
    description: (
      <>
        Manipulate files over <strong>file://</strong>, <strong>s3://</strong> etc.
      </>
    ),
  },
  {
    title: 'Secure your web application',
    imageUrl: '',
    description: (
      <>
       Use jails to restrict access to directories in your filesystem.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="The single way to manipulate files in NodeJS/TypeScript">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img width="64px" src="img/logo.svg" />
         <p><small>Version 2.0.0</small></p> 
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting-started/installation')}>
              Get Started
            </Link>
            <Link
              className={clsx(
                'button button--outline button--lg ml-1',
              )}
              to={useBaseUrl('docs/migration/v2')}>
              Upgrade Guide
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      <hr/>
          <section>
            <div className="container">
                <h2 className='text-center'>Write cleaner code</h2>
<CodeBlock language="jsx">
{`
import { Storage } from 'typefs';
const manifest = Storage.disk('config').readFile('app.manifest');
`}
</CodeBlock>
            </div>
          </section>
      </main>
    </Layout>
  );
}
