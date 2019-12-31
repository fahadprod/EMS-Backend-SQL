/* eslint-disable no-unused-vars */
const created = ' created.'
const deleted = ' deleted.'
const updated = ' updated.'
const notFound = ' not found.'
const notCreated = ' could not be created.'
const notDeleted = ' could not be deleted.'
const notUpdated = ' could not be updated.'

const certificateName = 'Employee certificate'
const skillName = 'Employee skill'
const degreeName = 'Employee degree'
const workExp = 'Employee work experience '

const Employee = {
  notEmployee: 'Employee' + notFound,
  firstName: 'First name is required.',
  lastName: 'Last name is required.',
  designationId: 'designation Id field is required.',
  admin: 'Admin field is required.',
  employeeId: 'Employee Id is required.',
  empskillId: 'Employee Skill Id is required.',
  empWorkExpId: 'Employee work experience Id is required.',
  empDegreeId: 'Employee Degree Id is required.',
  empCertificateId: 'Employee Certificate Id is required.',
  notCompany: 'Company field is required.',
  unauthorize: ' unauthorized employee access.'
}

const profilePic = {
  uploaded: 'Profile picture uploaded.',
  notUploaded: 'Profile picture not uploaded.'
}
const Login = {
  successful: 'Login successful.',
  unsucessful: 'Login unsuccessful.'
}
const Logout = {
  successful: 'Logout successful.',
  unsucessful: 'Logout unsuccessful.'
}
const Password = {
  changed: 'Password changed.',
  notChanged: 'Password not changed.',
  currentPassword: 'Current Password is required.',
  notPassword: 'Password is required.',
  passwordLength: 'Password should be minimum 7 maximum 15 characters long.'

}
const Email = {
  notEmail: 'Email field required.',
  notFormat: 'Email format is invalid.'
}
const Designation = {
  notDesignation: 'Designation field is required.',
  notId: 'Designation Id field is required.'
}
const Year = {
  notStartYear: 'Start Year field is required.',
  notEndYear: 'end Year field is required.',
  notCompletionDate: 'Completion year required.'
}
const Certificate = {
  notId: 'Certificate Id field is required.',
  notLocation: 'Location field required.',
  notTitle: 'Title field required.',
  notOrganization: 'Organization field required.',
  created: certificateName + created,
  deleted: certificateName + deleted,
  updated: certificateName + updated,
  notFound: certificateName + notFound,
  notCreated: certificateName + notCreated,
  notDeleted: certificateName + notDeleted,
  notUpdated: certificateName + notUpdated
}
const Skill = {
  created: skillName + created,
  deleted: skillName + deleted,
  updated: skillName + updated,
  notFound: skillName + notFound,
  notCreated: skillName + notCreated,
  notDeleted: skillName + notDeleted,
  notUpdated: skillName + notUpdated
}
const Degrees = {
  notId: 'Degree Id field is required.',
  notInstituteName: 'Institute name required.',
  notCgpa: 'Cgpa field required.',
  notPercentage: 'Percentage field required.',
  created: degreeName + created,
  deleted: degreeName + deleted,
  updated: degreeName + updated,
  notFound: degreeName + notFound,
  notCreated: degreeName + notCreated,
  notDeleted: degreeName + notDeleted,
  notUpdated: degreeName + notUpdated
}
const workExperience = {
  notId: 'Work experience Id field is required.',
  created: workExp + created,
  deleted: workExp + deleted,
  updated: workExp + updated,
  notFound: workExp + notFound,
  notCreated: workExp + notCreated,
  notDeleted: workExp + notDeleted,
  notUpdated: workExp + notUpdated
}

module.exports = {
  Employee,
  Password,
  Email,
  Designation,
  Year,
  Login,
  Logout,
  Certificate,
  Skill,
  Degrees,
  created,
  deleted,
  updated,
  notCreated,
  notDeleted,
  notUpdated,
  notFound,
  profilePic,
  workExperience
}