import { useEffect } from "react";
import { getProjectData, onProjectCreatedEvent } from "../../services/projects";

export const useContractListener = () => {
  const projectCreatedListener = async (projectAddress: string) => {
    const projectData = await getProjectData(projectAddress);
    console.log({
      projectAddress,
      data: projectData,
    });
  };

  useEffect(() => {
    onProjectCreatedEvent(projectCreatedListener);
  }, []);
};
