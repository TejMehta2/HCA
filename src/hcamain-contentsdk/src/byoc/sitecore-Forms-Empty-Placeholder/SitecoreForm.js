'use client';
import * as FEAAS from '@sitecore-feaas/clientside/react';

function SitecoreForm() {
  return (
    <div className="sitecore-forms-empty-placeholder">      
    </div>
  );
}

export default SitecoreForm;

FEAAS.registerComponent(SitecoreForm, {
  name: 'SitecoreForm',
});

