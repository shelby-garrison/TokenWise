import React, { useState } from 'react';
import InsightsPanel from '../components/Dashboard/InsightsPanel';
import ActivityTable from '../components/Dashboard/ActivityTable';
import TopHolders from '../components/Dashboard/TopHolders';
import TimeFilter from '../components/Filters/TimeFilter';
import ExportButton from '../components/ExportButton';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<{ start?: string; end?: string }>({});

  return (
    <div>
      <InsightsPanel {...timeRange} />
      <TimeFilter start={timeRange.start} end={timeRange.end} onChange={setTimeRange} />
      <ExportButton filters={timeRange} />
      <ActivityTable {...timeRange} />
      <div style={{ marginTop: 48 }}>
        <TopHolders />
      </div>
    </div>
  );
};

export default Dashboard; 