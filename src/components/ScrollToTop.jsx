import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // Only scroll to top if the navigation type is NOT 'POP' (i.e., not a back/forward action)
        if (navType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [location, navType]);

    return null;
};

export default ScrollToTop;
