"use client";

import { useProjectsQuery } from "@/entities/project";
import { useSkillsQuery } from "@/entities/skill";
import { ProjectsList } from "@/features/projects-list";
import { ProjectsListSkeleton } from "@/features/projects-list/ui/skeletons/projects-list-skeleton";
import { SkillsFilter } from "@/features/skills-filter";
import { useToastsAPIStore } from "@/features/toasts-api";
import { UILoadableContent } from "@/shared/ui";
import { BadgeListSkeleton } from "@/shared/ui/skeletons";
import { type HTMLAttributes, useContext, useEffect } from "react";
import { SkillsContext, SkillsProvider } from "../context/skills-provider";
import { getFilteredProjects } from "../model/projects-filter";
import { ProjectsResearchLayout } from "./projects-research-layout";
import { useAnimationControls } from "framer-motion";

interface ProjectsResearchProps extends HTMLAttributes<HTMLElement> {}

const ProjectsResearchComponent = ({ ...props }: ProjectsResearchProps) => {
	const { selectedSkills, setSelectedSkills } = useContext(SkillsContext);

	const skillsQuery = useSkillsQuery();

	const addToast = useToastsAPIStore((state) => state.addToast);
	const projectsQuery = useProjectsQuery();

	const filteredProjects = getFilteredProjects(
		projectsQuery.data ?? [],
		selectedSkills,
	);

	useEffect(() => {
		if (projectsQuery.error) {
			addToast({
				status: "error",
				title: "Ошибка",
				text: "Не удалось загрузить проекты",
			});
		}
	}, [addToast, projectsQuery.error]);

	return (
		<ProjectsResearchLayout
			{...props}
			skillsFilter={
				<UILoadableContent
					loader={<BadgeListSkeleton count={15} minWidth={70} maxWidth={150} />}
					isLoading={skillsQuery.isLoading}
					canShow={skillsQuery.isSuccess}
				>
					<SkillsFilter
						skills={skillsQuery.data ?? []}
						onChangeSkills={setSelectedSkills}
					/>
				</UILoadableContent>
			}
			projectsList={
				<UILoadableContent
					loader={<ProjectsListSkeleton />}
					isLoading={projectsQuery.isLoading}
					canShow={projectsQuery.isSuccess}
				>
					<ProjectsList
						projects={filteredProjects}
						selectedSkills={selectedSkills}
						projectsAnimationProps={(projectIndex) => ({
							initial: {
								zoom: 0.8,
							},
							animate: {
								zoom: 1,
							},
							transition: {
								type: "tween",
								duration: 0.25,
								delay: 0.1 * projectIndex,
							},
							viewport: {
								once: true,
							},
						})}
					/>
				</UILoadableContent>
			}
		/>
	);
};

export const ProjectsResearch = ({ ...props }: ProjectsResearchProps) => {
	return (
		<SkillsProvider>
			<ProjectsResearchComponent {...props} />
		</SkillsProvider>
	);
};
