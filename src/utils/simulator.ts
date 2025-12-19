import type { Algorithm, Frame, SimulationStep, SimulationResult } from "../types";

export const simulatePageReplacement = (
  pageSequence: string[],
  memorySize: number,
  algorithm: Algorithm
): SimulationResult => {
  const frames: Frame[] = Array(memorySize).fill(null).map(() => ({
    page: null,
    loadTime: -1,
    lastAccess: -1,
    accessCount: 0,
    refBit: false,
  }));

  const steps: SimulationStep[] = [];
  let totalHits = 0;
  let totalFaults = 0;
  let clockPointer = 0;
  let frameLoadOrder: number[] = []; // Track FIFO order

  pageSequence.forEach((requestedPage, stepIndex) => {
    const step = stepIndex + 1;
    
    // Check if page is already in memory (hit)
    const existingFrameIndex = frames.findIndex(
      (f) => f.page === requestedPage
    );

    if (existingFrameIndex !== -1) {
      // Page hit
      frames[existingFrameIndex].lastAccess = step;
      frames[existingFrameIndex].accessCount++;
      frames[existingFrameIndex].refBit = true; // Set reference bit for Clock
      totalHits++;

      steps.push({
        step,
        requestedPage,
        frames: frames.map((f) => ({ ...f })),
        isHit: true,
        replacedPage: null,
        replacedFrameIndex: null,
        clockPointer: algorithm === "clock" ? clockPointer : undefined,
        explanation: `Page ${requestedPage} is already in frame ${existingFrameIndex + 1}. Hit!`,
      });
      return;
    }

    // Page fault - need to load page
    totalFaults++;

    // Find empty frame first
    const emptyFrameIndex = frames.findIndex((f) => f.page === null);

    if (emptyFrameIndex !== -1) {
      // Empty frame available
      frames[emptyFrameIndex].page = requestedPage;
      frames[emptyFrameIndex].loadTime = step;
      frames[emptyFrameIndex].lastAccess = step;
      frames[emptyFrameIndex].accessCount = 1;
      frames[emptyFrameIndex].refBit = true;
      frameLoadOrder.push(emptyFrameIndex);

      steps.push({
        step,
        requestedPage,
        frames: frames.map((f) => ({ ...f })),
        isHit: false,
        replacedPage: null,
        replacedFrameIndex: emptyFrameIndex,
        clockPointer: algorithm === "clock" ? clockPointer : undefined,
        explanation: `Page ${requestedPage} loaded into empty frame ${emptyFrameIndex + 1}. Fault!`,
      });
      return;
    }

    // No empty frame - need to replace
    let replacedFrameIndex: number;
    let replacedPage: string | null;
    let explanation: string;

    switch (algorithm) {
      case "fifo": {
        // Replace the page that entered memory earliest
        replacedFrameIndex = frameLoadOrder[0];
        replacedPage = frames[replacedFrameIndex].page;
        frameLoadOrder.shift();
        frameLoadOrder.push(replacedFrameIndex);
        explanation = `FIFO: Replace page ${replacedPage} in frame ${replacedFrameIndex + 1} (loaded earliest at step ${frames[replacedFrameIndex].loadTime})`;
        break;
      }

      case "lru": {
        // Replace the page that has not been used for the longest time
        let lruIndex = 0;
        let oldestAccess = frames[0].lastAccess;
        for (let i = 1; i < frames.length; i++) {
          if (frames[i].lastAccess < oldestAccess) {
            oldestAccess = frames[i].lastAccess;
            lruIndex = i;
          }
        }
        replacedFrameIndex = lruIndex;
        replacedPage = frames[replacedFrameIndex].page;
        explanation = `LRU: Replace page ${replacedPage} in frame ${replacedFrameIndex + 1} (least recently used at step ${oldestAccess})`;
        break;
      }

      case "opt": {
        // Replace the page that will not be used for the longest time in the future
        let optIndex = 0;
        let farthestUse = -1;
        
        for (let i = 0; i < frames.length; i++) {
          const page = frames[i].page;
          // Skip if frame is empty (shouldn't happen in replacement phase, but safety check)
          if (page === null) {
            optIndex = i;
            farthestUse = Infinity;
            break;
          }
          
          // Find next use of this page in future sequence
          const nextUse = pageSequence.findIndex(
            (p, idx) => idx > stepIndex && p === page
          );
          
          if (nextUse === -1) {
            // Page won't be used again - perfect candidate
            optIndex = i;
            farthestUse = Infinity;
            break;
          } else if (nextUse > farthestUse) {
            farthestUse = nextUse;
            optIndex = i;
          }
        }
        
        replacedFrameIndex = optIndex;
        replacedPage = frames[replacedFrameIndex].page;
        const nextUseStep = farthestUse === Infinity 
          ? "never" 
          : `step ${farthestUse + 1}`;
        explanation = `Optimal: Replace page ${replacedPage} in frame ${replacedFrameIndex + 1} (next used ${nextUseStep})`;
        break;
      }

      case "lfu": {
        // Replace the page with the lowest usage count
        let lfuIndex = 0;
        let minAccess = frames[0].accessCount;
        let oldestTime = frames[0].loadTime;
        
        for (let i = 1; i < frames.length; i++) {
          if (
            frames[i].accessCount < minAccess ||
            (frames[i].accessCount === minAccess &&
              frames[i].loadTime < oldestTime)
          ) {
            minAccess = frames[i].accessCount;
            oldestTime = frames[i].loadTime;
            lfuIndex = i;
          }
        }
        
        replacedFrameIndex = lfuIndex;
        replacedPage = frames[replacedFrameIndex].page;
        explanation = `LFU: Replace page ${replacedPage} in frame ${replacedFrameIndex + 1} (lowest access count: ${minAccess})`;
        break;
      }

      case "clock": {
        // Use circular pointer and reference bits
        let startPointer = clockPointer;
        let passes = 0;
        const maxPasses = frames.length * 2; // Maximum 2 full passes
        
        // First pass: look for page with refBit = false
        while (passes < maxPasses) {
          if (!frames[clockPointer].refBit) {
            // Found a page with refBit = 0, replace it
            break;
          }
          // Clear reference bit and move pointer
          frames[clockPointer].refBit = false;
          clockPointer = (clockPointer + 1) % frames.length;
          passes++;
          
          // If we've completed a full cycle, the current page (with refBit now 0) will be replaced
          if (clockPointer === startPointer) {
            break;
          }
        }
        
        replacedFrameIndex = clockPointer;
        replacedPage = frames[replacedFrameIndex].page;
        const replacedFrameNum = replacedFrameIndex + 1;
        clockPointer = (clockPointer + 1) % frames.length;
        explanation = `Clock: Replace page ${replacedPage} in frame ${replacedFrameNum} (reference bit was 0 at pointer position)`;
        break;
      }
    }

    // Perform replacement
    frames[replacedFrameIndex].page = requestedPage;
    frames[replacedFrameIndex].loadTime = step;
    frames[replacedFrameIndex].lastAccess = step;
    frames[replacedFrameIndex].accessCount = 1;
    frames[replacedFrameIndex].refBit = true;

    if (algorithm === "fifo" && !frameLoadOrder.includes(replacedFrameIndex)) {
      frameLoadOrder.push(replacedFrameIndex);
    }

    steps.push({
      step,
      requestedPage,
      frames: frames.map((f) => ({ ...f })),
      isHit: false,
      replacedPage,
      replacedFrameIndex,
      clockPointer: algorithm === "clock" ? clockPointer : undefined,
      explanation,
    });
  });

  const hitRatio = pageSequence.length > 0 ? totalHits / pageSequence.length : 0;

  return {
    steps,
    totalHits,
    totalFaults,
    hitRatio,
  };
};

