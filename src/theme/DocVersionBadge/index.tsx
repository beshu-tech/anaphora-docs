import React, { type ReactNode } from 'react';
import type DocVersionBadgeType from '@theme/DocVersionBadge';
import type { WrapperProps } from '@docusaurus/types';
import { useVersions, useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { useHistory } from '@docusaurus/router';

type Props = WrapperProps<typeof DocVersionBadgeType>;

export default function DocVersionBadgeWrapper(_props: Props): ReactNode {
  const versions = useVersions(undefined);
  const activeDocContext = useActiveDocContext(undefined);
  const history = useHistory();

  const activeVersion = activeDocContext?.activeVersion;

  if (versions.length <= 1) {
    return null;
  }

  const getVersionPath = (version: typeof versions[0]) => {
    const alternateDoc = activeDocContext?.alternateDocVersions?.[version.name];
    if (alternateDoc) {
      return alternateDoc.path;
    }
    return version.path;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = versions.find((v) => v.name === e.target.value);
    if (selected) {
      history.push(getVersionPath(selected));
    }
  };

  return (
    <select
      value={activeVersion?.name ?? ''}
      onChange={handleChange}
      aria-label="Select documentation version"
      style={{
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: '2px 6px',
        borderRadius: '4px',
        border: '1px solid var(--ifm-color-primary)',
        color: 'var(--ifm-color-primary)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        appearance: 'auto',
      }}
    >
      {versions.map((version) => (
        <option key={version.name} value={version.name}>
          {version.label}
        </option>
      ))}
    </select>
  );
}
