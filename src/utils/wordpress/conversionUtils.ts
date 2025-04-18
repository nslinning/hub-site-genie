
export const conversionSteps = {
  analyze: [
    "Scanning React components",
    "Identifying WordPress compatibility",
    "Mapping component structures",
    "Generating conversion strategy"
  ],
  generate: [
    "Preparing WordPress theme structure",
    "Converting React components",
    "Implementing WordPress hooks",
    "Generating template files",
    "Finalizing theme configuration"
  ]
};

export const simulateProcess = async (
  steps: string[], 
  setProgress: React.Dispatch<React.SetStateAction<string[]>>,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  for (const step of steps) {
    setProgress(prevSteps => [...prevSteps, step]);
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  setState(false);
  setProgress([]);
};
