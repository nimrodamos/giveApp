import React, { createContext, useContext, useState, useMemo } from "react";
import { api } from "@/api";
import { Project } from "@/types/projectTypes";

interface ProjectContextType {
  projects: Project[];
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  fetchProject: (projectId: string) => Promise<void>;
  setProjects: (projects: Project[]) => void;
  setProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjectsState] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set an array of projects
  const setProjects = (projects: Project[]) => {
    setProjectsState(projects);
  };

  // Set a single project in the projects array (useful for updating a project)
  const setProject = (project: Project) => {
    setProjectsState((prevProjects) => {
      // Make sure the project is defined and has _id before trying to access it
      if (!project || !project._id) {
        console.error("Invalid project:", project);
        return prevProjects;
      }
      return prevProjects.map((p) => (p._id === project._id ? project : p));
    });
  };

  // Fetch a single project by ID
  const fetchProject = async (projectId: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`projects/${projectId}`);
      const fetchedProject = response.data;
      if (fetchedProject && fetchedProject._id) {
        setProject(fetchedProject);
      } else {
        console.error("Invalid project data:", fetchedProject);
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`projects`);
      setProjects(response.data);
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      projects,
      isLoading,
      fetchProjects,
      fetchProject,
      setProjects,
      setProject,
    }),
    [projects, isLoading]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
