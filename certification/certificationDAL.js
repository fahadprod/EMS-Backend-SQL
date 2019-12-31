const models = require('../database/models')
/*
  Data Access Layer, this file contains all of the functions that deals with actual business logic.
*/

const getCertificates = async () => {
  const certificates = await models.certification.findAll()
  return certificates
}

const getCertificate = async (certificateId) => {
  const certificate = await models.certification.findByPk(certificateId)
  return certificate
}

const addCertificate = async (certificate) => {
  var created = false
  const certification = await models.certification.findOne({ where: { certification: certificate } })
  if (certification == null) {
    await models.certification.create({
      certification: certificate
    })
    created = true
  }
  return created
}

const deleteCertificate = async (certificateId) => {
  var deleted = false
  const certificate = await getCertificate(certificateId)
  if (certificate != null) {
    await certificate.destroy()
    deleted = true
  }
  return deleted
}

const updateCertificate = async (data) => {
  var updated = false
  const certificate = await getCertificate(data.certificateId)
  if (certificate != null) {
    await certificate.update({ certification: data.certificateName })
    updated = true
  }
  return updated
}
module.exports = {
  getCertificates, getCertificate, addCertificate, deleteCertificate, updateCertificate
}
