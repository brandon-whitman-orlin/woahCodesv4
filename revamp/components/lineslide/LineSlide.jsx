import React, { useEffect, useRef, useState } from 'react';
import "./LineSlide.css";

const LineSlide = ({ children, speed = 4 }) => {
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [lineHeight, setLineHeight] = useState(30);  // Default fallback line height

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    // Create a temporary <p> element to measure line height
    const tempP = document.createElement('p');
    tempP.innerText = "Test"; // Text to calculate the line height
    tempP.style.visibility = 'hidden'; // Hide it while measuring
    tempP.style.position = 'absolute'; // Remove from flow
    containerRef.current.appendChild(tempP);

    // Capture the height of the temporary <p> element
    const calculatedHeight = tempP.offsetHeight;
    setLineHeight(calculatedHeight); // Set the calculated height as the line height

    // Clean up by removing the temporary <p> element
    tempP.remove();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current[0]) observer.observe(textRef.current[0]);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const elements = textRef.current.filter((el) => el);
    let accumulatedDelay = 0;
    let totalDuration = 0; // Track when the cascade ends

    elements.forEach((element, index) => {
      if (!element) return;

      element.style.visibility = "hidden"; // Hide original text

      const textContentClone = element.cloneNode(false);
      textContentClone.classList.add("text-content-clone");

      const rect = element.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      textContentClone.style.position = 'absolute';
      textContentClone.style.top = `${rect.top - containerRect.top}px`; 
      textContentClone.style.left = `${rect.left - containerRect.left}px`; 
      textContentClone.style.width = `${rect.width}px`;
      textContentClone.style.height = `${rect.height}px`;
      textContentClone.style.zIndex = '10';
      textContentClone.style.visibility = 'visible';  // Ensure clones are visible during animation

      containerRef.current.appendChild(textContentClone);

      const elementHeight = element.clientHeight;
      const lineCount = Math.round(elementHeight / lineHeight);

      const paragraphBaseDelay = index === 0 ? 0 : accumulatedDelay;

      for (let i = 0; i < lineCount; i++) {
        const clone = document.createElement('div');
        clone.classList.add('clone');
        clone.style.position = 'absolute';
        clone.style.overflow = 'hidden';
        clone.style.height = `${lineHeight}px`;
        clone.style.width = "100%";
        clone.style.top = "0";
        clone.style.transition = `margin-top 0.3s ease-out`; 
        clone.style.marginTop = `-${lineHeight}px`;

        const lineContent = document.createElement('div'); // Create a div instead of p
        lineContent.innerHTML = element.innerHTML;
        lineContent.style.position = 'absolute';
        lineContent.style.transform = `translateY(-${i * lineHeight}px)`;

        clone.style.zIndex = lineCount - i;

        const lineDelay = paragraphBaseDelay + (i * 0.2) / speed; 
        clone.style.transitionDelay = `${lineDelay}s`;

        setTimeout(() => {
          clone.style.marginTop = `${i * lineHeight}px`;
        }, lineDelay * 1000); 

        clone.appendChild(lineContent);  // Append the lineContent div instead of p
        textContentClone.appendChild(clone);

        // Track the total animation duration
        totalDuration = Math.max(totalDuration, lineDelay + 0.3);
      }

      accumulatedDelay += (lineCount * 0.2 + 0.5) / speed;
    });

    // After cascade ends, show original text and remove clones
    setTimeout(() => {
      setShowOriginalText(true);

      // Remove all clones from the DOM
      document.querySelectorAll(".text-content-clone").forEach((clone) => {
        clone.remove();
      });
    }, totalDuration * 3000);
  }, [hasAnimated, children, speed, lineHeight]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {React.Children.map(children, (child, index) => (
        <div 
          ref={(el) => (textRef.current[index] = el)} 
          className="text-content"
          style={{ visibility: showOriginalText ? "visible" : "hidden" }}
        >
          {child}
        </div> // Replaced <p> with <div>
      ))}
    </div>
  );
};

export default LineSlide;
