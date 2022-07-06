exports.mapViewToModel = (source) => {
  return {
    rate: parseInt(source.rating),
    experience: source.experience,
    type: source.skillType,
    skill: source.skill,
  };
};
