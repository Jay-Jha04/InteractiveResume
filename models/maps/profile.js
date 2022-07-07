exports.mapViewToModel = (source) => {
  return {
    first_name: source?.firstName,
    last_name: source?.lastName,
    location: source?.location,
    about_yourself: source?.aboutYourself,
    profile_image: source?.profilePic.length > 0 ? source?.profilePic[0] : null,
  };
};
