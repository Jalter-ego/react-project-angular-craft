import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import sdk from '@stackblitz/sdk';
import { generateProjectConfigFromResponse } from '../lib/extractFilesResponse';

export default function CodeBlitz() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const response = location.state?.response as string; 
  const nameComponent = location.state.nameComponent as string 
  const projectConfig = generateProjectConfigFromResponse(response,nameComponent);

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        sdk.embedProject(containerRef.current!, projectConfig, {
          height: '100%',
          width: '100%',
          openFile: 'src/app/app.component.ts',
        });
      }, 100);
    }
  }, []);

  return <div ref={containerRef} style={{ height: '100vh', width: '100%' }} />;
}
