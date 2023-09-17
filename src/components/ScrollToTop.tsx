import { useEffect } from 'react';

const  ScrollToTop =()=> {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; //doesn't render anything, it just triggers the scroll
}

export default ScrollToTop;
