'use client';

import { HashLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <HashLoader size={50} color="#30b879"/>
    </div>
   );
}
 
export default Loader;