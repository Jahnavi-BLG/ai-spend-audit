import React from 'react';
import SpendForm from '../components/SpendForm';
import LeadCapture from '../components/LeadCapture';

export default function Home() {
  return (
    <div>
      {/* 
        This is the main landing page of our application. 
        It simply renders the form where users can calculate their AI spend, 
        and the lead capture section below it.
      */}
      <SpendForm />
      <LeadCapture />
    </div>
  );
}