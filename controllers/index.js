const {loginGoogle, refreshAccessToken, logout, login, register } = require("./auth");
const {getAllStudent, updateStudent, deleteStudent, getStudentById, createStudent, getAllStudentPaging, updateProfile} = require("./student");
const {uploadFile, pushNotification} = require('./firebaseService');
const {getAllProjects, createProject, updateProject, deleteProject, getProjectById, getAllProjectsHome} = require('./project');
const {getAllMajors, createMajor, updateMajor, deleteMajor, getMajorById} = require('./major');
const {getAllCategories, createCategory, updateCategory, deleteCategory, getCategoryById} = require('./category');
const {getAllDeliverables, createDeliverable, updateDeliverable, deleteDeliverable, getDeliverableById} = require('./deliverable');
const {getAllRoles} = require('./role');
const {payment, stripeWebhook} = require('./payment');
const {getAllApplications, createApplication, acceptApplication, getApplicationById, updateApplication, deleteApplication} = require("./application");
const {sendMail} = require('./sendMail');
const {countAllProjectInOneAPI, countAllAccount, countAllFinishProject, summaryAllTransaction} = require('./statistic');

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
  getMajorById,
  getCategoryById,
  getAllDeliverables, 
  createDeliverable, 
  updateDeliverable, 
  deleteDeliverable, 
  getDeliverableById,
  countAllProjectInOneAPI,
  payment,
  stripeWebhook,
  login, 
  register,
  countAllAccount,
  countAllFinishProject,
  sendMail,
  summaryAllTransaction,

};
