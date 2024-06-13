//function to create a dummy resource for testing purposes
exports.createDummyData = async (model) => {
  const dummyData = new model({
    name: "Test",
  });

  const response = await dummyData.save();
  testId = response._id.toHexString();
  return testId;
};

exports.createDummyCourse = async (model, typeId, universityId) => {
  const dummyCourse = new model({
    name: "test course",
    typeId: typeId,
    universityId: universityId,
  });

  const response = await dummyCourse.save();
  testCourseId = response._id.toHexString();
  return testCourseId;
};

//function to modify the Id of the test resource to generate a not found error
exports.replaceFirstCharId = (testId) => {
  try {
    const firstChar = testId.charAt(0);
    const charsRegex = /^a-zA-Z$/;
    if (charsRegex.test(firstChar)) {
      modifiedTestId = testId.replace(firstChar, "1");
    } else {
      modifiedTestId = testId.replace(firstChar, "a");
    }
    return modifiedTestId;
  } catch (error) {
    console.log("errore", error);
  }
};
