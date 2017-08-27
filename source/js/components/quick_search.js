import React from 'react';
import { Link } from 'react-router';

export default function QuickSearch() {
  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='flex-container'>
          <Link to='/Stan' name='Stanovi' className='quickitem'>Stanovi</Link>
          <Link to='/Poslovni_prostor' name='Poslovni prostor' className='quickitem'>Poslovni prostor</Link>
          <Link to='/Kuća' name='Kuće' className='quickitem'>Kuće</Link>
          <Link to='/Plac' name='Placevi' className='quickitem'>Placevi</Link>
        </div>
      </div>
    </div>
  );
}
