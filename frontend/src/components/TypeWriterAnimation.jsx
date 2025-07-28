import React, { useEffect, useState } from "react";

export const TypeWriterAnimation = ({
  tag,
  text,
  speed = 50,
  onComplete,
  classString = "",
  trigger = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (trigger) {
      setDisplayedText("");
      setIndex(0);
      setIsTyping(true);
    }
  }, [text, trigger]);

  useEffect(() => {
    if (!trigger || !isTyping) return;

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      if (onComplete) onComplete();
    }
  }, [index, text, speed, onComplete, trigger, isTyping]);

  const Tag = tag;

  return (
    <Tag className={classString}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </Tag>
  );
};
