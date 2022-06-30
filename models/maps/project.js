exports.mapViewToModel = (source) => {
  const end_date = source.Information.isCurrentlyWorking
    ? "present"
    : `${source.Information.endYear} ${source.Information.endMonth}`;
  return {
    title: source.Information.title,
    project_profile: source.Information.introduction,
    start_date: `${source.Information.startYear} ${source.Information.startMonth}`,
    end_date: end_date,
    descriptions: source.Information.description,
    project_images: [...source.Information.images],
    github_url: source.Information.githubUrl,
    project_url: source.Information.projectUrl,
  };
};
