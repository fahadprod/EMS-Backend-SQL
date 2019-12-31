/* eslint-disable eqeqeq */
const models = require('../../database/models')

exports.addEmpCertificate = async (data) => {
  var success = false
  var certificate = await models.certification.findByPk(data.certificateId)
  if (certificate) {
    const emp = await models.employee.findByPk(data.empId)
    if (emp) {
      const empCertificate = await models.empCertifications.findOne({
        where: { certificationId: data.certificateId, employeeId: data.empId }
      })
      if (!empCertificate) {
        await emp.addCertification(certificate, {
          through: {
            title: data.title,
            organization: data.organization,
            location: data.location,
            completionDate: data.completionDate
          }
        })
        success = true
      }
    }
  }
  return success
}
exports.updateEmpCertificate = async (data) => {
  var success = false
  var updateCertificate = await models.empCertifications.findByPk(data.empCertificateId)
  var empCertifications = await models.empCertifications.findAll({ where: { employeeId: data.empId } })
  var i
  var exist = false
  var updateIt = true
  if (empCertifications) {
    for (i = 0; i < empCertifications.length; i++) {
      if (empCertifications[i].certificationId == data.certificationId) {
        exist = true
        break
      }
    }
    if (exist) {
      if (updateCertificate.id == empCertifications[i].id) {
        if (updateCertificate.certificationId != data.certificationId) {
          updateIt = true
        }
      }
    } else {
      updateIt = true
    }
    if (updateIt) {
      await updateCertificate.update({
        certificationId: data.certificationId,
        title: data.title,
        organization: data.organization,
        location: data.location,
        completionDate: data.completionDate
      })
      success = true
    }
  }
  return success
}
exports.deleteEmpCertificate = async (data) => {
  var deleted = false
  const empCertificate = await models.empCertifications.findByPk(data.empCertificateId)
  if (empCertificate && empCertificate.employeeId == data.empId) {
    await empCertificate.destroy()
    deleted = true
  }
  return deleted
}
