import { memo } from 'react';
import type { TemplateTests } from '../model/types';
import { StatusRow } from './StatusRow';
import './StatusRowGroup.css';

export const StatusRowGroup = memo(({ data }: { data: TemplateTests[] }) => {
  return (
    <div className="result-grid">
      {data.map((result) => (
        <StatusRow key={result.id} {...result} />
      ))}
    </div>
  );
});
