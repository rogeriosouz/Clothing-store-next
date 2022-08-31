import { useState } from 'react';

export default function Test() {
  const [selet, setSelect] = useState('');

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <select onChange={(e) => setSelect(e.target.value)}>
        <option value="aa">aa</option>
        <option value="aa2">aa2</option>
        <option value="aa3">aa3</option>
      </select>
    </div>
  );
}
