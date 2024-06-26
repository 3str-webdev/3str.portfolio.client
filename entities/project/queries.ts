import type { ProjectDto } from "@/shared/api/types";
import { addApiAuthHeader } from "@/shared/lib/add-api-auth-header";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { PROJECTS } from "./__mock__/projects";

const getAllProjects = async () => {
	// try {
	// 	const response = await axios.get<AxiosResponse<ProjectDto[]>>(
	// 		"/api/projects?populate=*",
	// 		addApiAuthHeader(),
	// 	);
	// 	const projects = response.data.data;
	// 	return projects;
	// } catch (e) {
	// 	console.error("Query projects error");
	// 	return [];
	// }

	return PROJECTS;
};

const getProjectById = async (id: number) => {
	return PROJECTS.find((project) => project.id === id);
};

const projectsKey = ["projects"];

export const useProjectsQuery = () => {
	return useQuery({
		queryFn: getAllProjects,
		queryKey: projectsKey,
	});
};

export const useProjectByIdQuery = (id: number) => {
	return useQuery({
		queryFn: () => getProjectById(id),
		queryKey: projectsKey.concat([`project-${id}`]),
	});
};
