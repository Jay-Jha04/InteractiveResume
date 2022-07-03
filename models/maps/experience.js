exports.mapViewToModel = (source) => {
  const endDate = source.isCurrentlyWorking
    ? "present"
    : `${source.endYear} ${source.endMonth}`;
  return {
    title: source.title,
    employement_type: source.jobType,
    profile_headline: source.profileHeadline,
    description: source.description,
    company: {
      name: source.companyName,
      location: source.companyLocation,
      start_date: `${source.startYear} ${source.startMonth}`,
      end_date: endDate,
    },
  };
};
