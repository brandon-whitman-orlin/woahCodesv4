import React, { useEffect, useState, useRef } from "react";
import "./RevealingText.css";

const LETTER_DELAY = 30;
const ELEMENT_DELAY = 300;

const RevealingText = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect(); // Stop observing once visible
          }
        },
        { threshold: 0.1 }
      );
  
      if (ref.current) observer.observe(ref.current);
  
      return () => observer.disconnect();
    }, []);
  
    const animateText = (child, index) => {
      return React.Children.map(child.props.children, (subChild, subIndex) => {
        if (typeof subChild === "string") {
          return subChild.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="word">
              {word.split("").map((char, i) => (
                <span
                  key={i}
                  className="letter"
                  style={{
                    animationDelay: `${index * ELEMENT_DELAY + subIndex * 100 + i * LETTER_DELAY}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
              <span className="space"> </span> {/* Keeps spaces from collapsing */}
            </span>
          ));
        }
        return subChild;
      });
    };
    
  
    return (
      <div ref={ref} className={`revealing-container ${visible ? "visible" : ""}`}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
  
          return React.cloneElement(child, {
            className: `${child.props.className || ""} revealing-text`,
            style: { animationDelay: `${index * ELEMENT_DELAY}ms` },
            children: animateText(child, index),
          });
        })}
      </div>
    );
  };
  
  export default RevealingText;
