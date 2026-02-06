import { useEffect, useState, useRef } from 'react';

const useIntersectionObserver = (options) => {
    // State để lưu trạng thái component có visible hay không
    const [isVisible, setIsVisible] = useState(false);
    // Ref để tham chiếu đến phần tử DOM cần theo dõi
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Nếu phần tử xuất hiện trong viewport
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Ngừng theo dõi sau khi đã xuất hiện để animation không lặp lại
                    observer.unobserve(entry.target);
                }
            },
            options
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        // Dọn dẹp observer khi component unmount
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return [elementRef, isVisible];
};

export default useIntersectionObserver;