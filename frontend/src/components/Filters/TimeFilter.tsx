import React from 'react';

interface Props {
  start?: string;
  end?: string;
  onChange: (range: { start?: string; end?: string }) => void;
}

const TimeFilter: React.FC<Props> = ({ start, end, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
      <label>
        Start:
        <input
          type="datetime-local"
          value={start || ''}
          onChange={e => onChange({ start: e.target.value || undefined, end })}
          style={{ marginLeft: 8 }}
        />
      </label>
      <label>
        End:
        <input
          type="datetime-local"
          value={end || ''}
          onChange={e => onChange({ start, end: e.target.value || undefined })}
          style={{ marginLeft: 8 }}
        />
      </label>
    </div>
  );
};

export default TimeFilter; 