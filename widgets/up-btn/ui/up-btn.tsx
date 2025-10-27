"use client";

import { ActionIcon, Transition } from "@mantine/core";
import { IconCaretUpFilled } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export const UpBtn = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Transition
      mounted={showScroll}
      transition="slide-up"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <ActionIcon
          radius="xl"
          size="lg"
          color="blue"
          variant="filled"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 99,
            ...styles,
          }}
          onClick={scrollToTop}
        >
          <IconCaretUpFilled />
        </ActionIcon>
      )}
    </Transition>
  );
};
