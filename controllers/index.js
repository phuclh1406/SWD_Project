const {loginGoogle, refreshAccessToken, logout} = require("./auth");
const {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentPaging, updateProfile} = require("./student");
const {uploadFile, pushNotification} = require('./firebaseService');
const {getAllProjects, createProject, updateProject, deleteProject, getProjectById, getAllProjectsHome} = require('./project')
const {getAllDeliverables, createDeliverable, updateDeliverable, deleteDeliverable, getDeliverableById} = require('./deliverable')
const {getAllMajors, createMajor, updateMajor, deleteMajor} = require('./major')
const {getAllCategories, createCategory, updateCategory, deleteCategory} = require('./category')
const {getAllRoles} = require('./role')
const {payment, stripeWebhook} = require('./payment')
const {getAllApplications, createApplication, acceptApplication, getApplicationById, updateApplication, deleteApplication} = require("./application")

module.exports = {
  loginGoogle,
  logout,
  getAllStudent,
  updateStudent, 
  deleteStudent,
  refreshAccessToken,
  uploadFile,
  pushNotification,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllMajors,
  createMajor,
  updateMajor,
  deleteMajor,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllRoles,
  getStudentById,
  getProjectById,
  createStudent,
  getAllStudentPaging,
  updateProfile,
  getAllProjectsHome,
  getAllApplications, 
  createApplication, 
  acceptApplication, 
  getApplicationById, 
  updateApplication, 
  deleteApplication,
  getAllDeliverables, 
  createDeliverable, 
  updateDeliverable, 
  deleteDeliverable, 
  getDeliverableById,
  payment,
  stripeWebhook

};
